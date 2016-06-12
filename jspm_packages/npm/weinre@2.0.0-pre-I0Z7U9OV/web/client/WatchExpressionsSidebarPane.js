/* */ 
(function(process) {
  WebInspector.WatchExpressionsSidebarPane = function() {
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Watch Expressions"));
    this.reset();
  };
  WebInspector.WatchExpressionsSidebarPane.prototype = {
    reset: function() {
      this.bodyElement.removeChildren();
      this.expanded = WebInspector.settings.watchExpressions.length > 0;
      this.section = new WebInspector.WatchExpressionsSection();
      this.bodyElement.appendChild(this.section.element);
      var addElement = document.createElement("button");
      addElement.setAttribute("type", "button");
      addElement.textContent = WebInspector.UIString("Add");
      addElement.addEventListener("click", this.section.addExpression.bind(this.section), false);
      var refreshElement = document.createElement("button");
      refreshElement.setAttribute("type", "button");
      refreshElement.textContent = WebInspector.UIString("Refresh");
      refreshElement.addEventListener("click", this.section.update.bind(this.section), false);
      var centerElement = document.createElement("div");
      centerElement.addStyleClass("watch-expressions-buttons-container");
      centerElement.appendChild(addElement);
      centerElement.appendChild(refreshElement);
      this.bodyElement.appendChild(centerElement);
      this.onexpand = this.refreshExpressions.bind(this);
    },
    refreshExpressions: function() {
      if (this.section)
        this.section.update();
    }
  };
  WebInspector.WatchExpressionsSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
  WebInspector.WatchExpressionsSection = function() {
    this._watchObjectGroupId = "watch-group";
    WebInspector.ObjectPropertiesSection.call(this);
    this.watchExpressions = WebInspector.settings.watchExpressions;
    this.headerElement.className = "hidden";
    this.editable = true;
    this.expanded = true;
    this.propertiesElement.addStyleClass("watch-expressions");
  };
  WebInspector.WatchExpressionsSection.NewWatchExpression = "\xA0";
  WebInspector.WatchExpressionsSection.prototype = {
    update: function() {
      function appendResult(expression, watchIndex, result) {
        var property = new WebInspector.RemoteObjectProperty(expression, result);
        property.watchIndex = watchIndex;
        properties.push(property);
        if (properties.length == propertyCount) {
          this.updateProperties(properties, WebInspector.WatchExpressionTreeElement, WebInspector.WatchExpressionsSection.CompareProperties);
          if (this._newExpressionAdded) {
            delete this._newExpressionAdded;
            treeElement = this.findAddedTreeElement();
            if (treeElement)
              treeElement.startEditing();
          }
        }
      }
      InspectorBackend.releaseWrapperObjectGroup(0, this._watchObjectGroupId);
      var properties = [];
      var propertyCount = 0;
      for (var i = 0; i < this.watchExpressions.length; ++i) {
        if (!this.watchExpressions[i])
          continue;
        ++propertyCount;
      }
      for (var i = 0; i < this.watchExpressions.length; ++i) {
        var expression = this.watchExpressions[i];
        if (!expression)
          continue;
        WebInspector.console.evalInInspectedWindow("(" + expression + ")", this._watchObjectGroupId, false, appendResult.bind(this, expression, i));
      }
      this.expanded = (propertyCount != 0);
    },
    addExpression: function() {
      this._newExpressionAdded = true;
      this.watchExpressions.push(WebInspector.WatchExpressionsSection.NewWatchExpression);
      this.update();
    },
    updateExpression: function(element, value) {
      this.watchExpressions[element.property.watchIndex] = value;
      this.saveExpressions();
      this.update();
    },
    findAddedTreeElement: function() {
      var children = this.propertiesTreeOutline.children;
      for (var i = 0; i < children.length; ++i)
        if (children[i].property.name === WebInspector.WatchExpressionsSection.NewWatchExpression)
          return children[i];
    },
    saveExpressions: function() {
      var toSave = [];
      for (var i = 0; i < this.watchExpressions.length; i++)
        if (this.watchExpressions[i])
          toSave.push(this.watchExpressions[i]);
      WebInspector.settings.watchExpressions = toSave;
      return toSave.length;
    }
  };
  WebInspector.WatchExpressionsSection.prototype.__proto__ = WebInspector.ObjectPropertiesSection.prototype;
  WebInspector.WatchExpressionsSection.CompareProperties = function(propertyA, propertyB) {
    if (propertyA.watchIndex == propertyB.watchIndex)
      return 0;
    else if (propertyA.watchIndex < propertyB.watchIndex)
      return -1;
    else
      return 1;
  };
  WebInspector.WatchExpressionTreeElement = function(property) {
    WebInspector.ObjectPropertyTreeElement.call(this, property);
  };
  WebInspector.WatchExpressionTreeElement.prototype = {
    update: function() {
      WebInspector.ObjectPropertyTreeElement.prototype.update.call(this);
      if (this.property.value.isError())
        this.valueElement.addStyleClass("watch-expressions-error-level");
      var deleteButton = document.createElement("input");
      deleteButton.type = "button";
      deleteButton.title = WebInspector.UIString("Delete watch expression.");
      deleteButton.addStyleClass("enabled-button");
      deleteButton.addStyleClass("delete-button");
      deleteButton.addEventListener("click", this._deleteButtonClicked.bind(this), false);
      this.listItemElement.insertBefore(deleteButton, this.listItemElement.firstChild);
    },
    _deleteButtonClicked: function() {
      this.treeOutline.section.updateExpression(this, null);
    },
    startEditing: function() {
      if (WebInspector.isBeingEdited(this.nameElement) || !this.treeOutline.section.editable)
        return;
      this.nameElement.textContent = this.property.name.trim();
      var context = {expanded: this.expanded};
      this.hasChildren = false;
      this.listItemElement.addStyleClass("editing-sub-part");
      WebInspector.startEditing(this.nameElement, {
        context: context,
        commitHandler: this.editingCommitted.bind(this),
        cancelHandler: this.editingCancelled.bind(this)
      });
    },
    editingCancelled: function(element, context) {
      if (!this.nameElement.textContent)
        this.treeOutline.section.updateExpression(this, null);
      this.update();
      this.editingEnded(context);
    },
    applyExpression: function(expression, updateInterface) {
      expression = expression.trim();
      if (!expression)
        expression = null;
      this.property.name = expression;
      this.treeOutline.section.updateExpression(this, expression);
    }
  };
  WebInspector.WatchExpressionTreeElement.prototype.__proto__ = WebInspector.ObjectPropertyTreeElement.prototype;
})(require('process'));
