/* */ 
(function(process) {
  WebInspector.StylesSidebarPane = function(computedStylePane) {
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Styles"));
    this.settingsSelectElement = document.createElement("select");
    var option = document.createElement("option");
    option.value = "original";
    option.action = this._changeColorFormat.bind(this);
    option.label = WebInspector.UIString("As Authored");
    this.settingsSelectElement.appendChild(option);
    var option = document.createElement("option");
    option.value = "hex";
    option.action = this._changeColorFormat.bind(this);
    option.label = WebInspector.UIString("Hex Colors");
    this.settingsSelectElement.appendChild(option);
    option = document.createElement("option");
    option.value = "rgb";
    option.action = this._changeColorFormat.bind(this);
    option.label = WebInspector.UIString("RGB Colors");
    this.settingsSelectElement.appendChild(option);
    option = document.createElement("option");
    option.value = "hsl";
    option.action = this._changeColorFormat.bind(this);
    option.label = WebInspector.UIString("HSL Colors");
    this.settingsSelectElement.appendChild(option);
    this.settingsSelectElement.appendChild(document.createElement("hr"));
    option = document.createElement("option");
    option.action = this._createNewRule.bind(this);
    option.label = WebInspector.UIString("New Style Rule");
    this.settingsSelectElement.appendChild(option);
    this.settingsSelectElement.addEventListener("click", function(event) {
      event.stopPropagation();
    }, false);
    this.settingsSelectElement.addEventListener("change", this._changeSetting.bind(this), false);
    var format = WebInspector.settings.colorFormat;
    if (format === "original")
      this.settingsSelectElement[0].selected = true;
    else if (format === "hex")
      this.settingsSelectElement[1].selected = true;
    else if (format === "rgb")
      this.settingsSelectElement[2].selected = true;
    else if (format === "hsl")
      this.settingsSelectElement[3].selected = true;
    this.titleElement.appendChild(this.settingsSelectElement);
    this._computedStylePane = computedStylePane;
    this.element.addEventListener("contextmenu", this._contextMenuEventFired.bind(this), true);
  };
  WebInspector.StylesSidebarPane.StyleValueDelimiters = " \t\n\"':;,/()";
  WebInspector.StylesSidebarPane.InheritedProperties = ["azimuth", "border-collapse", "border-spacing", "caption-side", "color", "cursor", "direction", "elevation", "empty-cells", "font-family", "font-size", "font-style", "font-variant", "font-weight", "font", "letter-spacing", "line-height", "list-style-image", "list-style-position", "list-style-type", "list-style", "orphans", "pitch-range", "pitch", "quotes", "richness", "speak-header", "speak-numeral", "speak-punctuation", "speak", "speech-rate", "stress", "text-align", "text-indent", "text-transform", "text-shadow", "visibility", "voice-family", "volume", "white-space", "widows", "word-spacing"].keySet();
  WebInspector.StylesSidebarPane.PseudoIdNames = ["", "first-line", "first-letter", "before", "after", "selection", "", "-webkit-scrollbar", "-webkit-file-upload-button", "-webkit-input-placeholder", "-webkit-slider-thumb", "-webkit-search-cancel-button", "-webkit-search-decoration", "-webkit-search-results-decoration", "-webkit-search-results-button", "-webkit-media-controls-panel", "-webkit-media-controls-play-button", "-webkit-media-controls-mute-button", "-webkit-media-controls-timeline", "-webkit-media-controls-timeline-container", "-webkit-media-controls-volume-slider", "-webkit-media-controls-volume-slider-container", "-webkit-media-controls-current-time-display", "-webkit-media-controls-time-remaining-display", "-webkit-media-controls-seek-back-button", "-webkit-media-controls-seek-forward-button", "-webkit-media-controls-fullscreen-button", "-webkit-media-controls-rewind-button", "-webkit-media-controls-return-to-realtime-button", "-webkit-media-controls-toggle-closed-captions-button", "-webkit-media-controls-status-display", "-webkit-scrollbar-thumb", "-webkit-scrollbar-button", "-webkit-scrollbar-track", "-webkit-scrollbar-track-piece", "-webkit-scrollbar-corner", "-webkit-resizer", "-webkit-input-list-button", "-webkit-inner-spin-button", "-webkit-outer-spin-button"];
  WebInspector.StylesSidebarPane.prototype = {
    _contextMenuEventFired: function(event) {
      var href = event.target.enclosingNodeOrSelfWithClass("webkit-html-resource-link") || event.target.enclosingNodeOrSelfWithClass("webkit-html-external-link");
      if (href) {
        var contextMenu = new WebInspector.ContextMenu();
        var filled = WebInspector.panels.elements.populateHrefContextMenu(contextMenu, event, href);
        if (filled)
          contextMenu.show(event);
      }
    },
    update: function(node, editedSection, forceUpdate) {
      var refresh = false;
      if (forceUpdate)
        delete this.node;
      if (!forceUpdate && (!node || node === this.node))
        refresh = true;
      if (node && node.nodeType === Node.TEXT_NODE && node.parentNode)
        node = node.parentNode;
      if (node && node.nodeType !== Node.ELEMENT_NODE)
        node = null;
      if (node)
        this.node = node;
      else
        node = this.node;
      if (!node) {
        this.bodyElement.removeChildren();
        this._computedStylePane.bodyElement.removeChildren();
        this.sections = {};
        return;
      }
      function stylesCallback(styles) {
        if (styles)
          this._rebuildUpdate(node, styles);
      }
      function computedStyleCallback(computedStyle) {
        if (computedStyle)
          this._refreshUpdate(node, computedStyle, editedSection);
      }
      if (refresh)
        WebInspector.cssModel.getComputedStyleAsync(node.id, computedStyleCallback.bind(this));
      else
        WebInspector.cssModel.getStylesAsync(node.id, stylesCallback.bind(this));
    },
    _refreshUpdate: function(node, computedStyle, editedSection) {
      for (var pseudoId in this.sections) {
        var styleRules = this._refreshStyleRules(this.sections[pseudoId], computedStyle);
        var usedProperties = {};
        var disabledComputedProperties = {};
        this._markUsedProperties(styleRules, usedProperties, disabledComputedProperties);
        this._refreshSectionsForStyleRules(styleRules, usedProperties, disabledComputedProperties, editedSection);
      }
      this.sections[0][0].rebuildComputedTrace(this.sections[0]);
    },
    _rebuildUpdate: function(node, styles) {
      this.bodyElement.removeChildren();
      this._computedStylePane.bodyElement.removeChildren();
      var styleRules = this._rebuildStyleRules(node, styles);
      var usedProperties = {};
      var disabledComputedProperties = {};
      this._markUsedProperties(styleRules, usedProperties, disabledComputedProperties);
      this.sections[0] = this._rebuildSectionsForStyleRules(styleRules, usedProperties, disabledComputedProperties, 0);
      var anchorElement = this.sections[0].inheritedPropertiesSeparatorElement;
      this.sections[0][0].rebuildComputedTrace(this.sections[0]);
      for (var i = 0; i < styles.pseudoElements.length; ++i) {
        var pseudoElementCSSRules = styles.pseudoElements[i];
        styleRules = [];
        var pseudoId = pseudoElementCSSRules.pseudoId;
        var entry = {
          isStyleSeparator: true,
          pseudoId: pseudoId
        };
        styleRules.push(entry);
        for (var j = pseudoElementCSSRules.rules.length - 1; j >= 0; --j) {
          var rule = pseudoElementCSSRules.rules[j];
          styleRules.push({
            style: rule.style,
            selectorText: rule.selectorText,
            sourceURL: rule.sourceURL,
            rule: rule,
            editable: !!(rule.style && rule.style.id)
          });
        }
        usedProperties = {};
        disabledComputedProperties = {};
        this._markUsedProperties(styleRules, usedProperties, disabledComputedProperties);
        this.sections[pseudoId] = this._rebuildSectionsForStyleRules(styleRules, usedProperties, disabledComputedProperties, pseudoId, anchorElement);
      }
    },
    _refreshStyleRules: function(sections, computedStyle) {
      var nodeComputedStyle = computedStyle;
      var styleRules = [];
      for (var i = 0; sections && i < sections.length; ++i) {
        var section = sections[i];
        if (section instanceof WebInspector.BlankStylePropertiesSection)
          continue;
        if (section.computedStyle)
          section.styleRule.style = nodeComputedStyle;
        var styleRule = {
          section: section,
          style: section.styleRule.style,
          computedStyle: section.computedStyle,
          rule: section.rule,
          editable: !!(section.styleRule.style && section.styleRule.style.id)
        };
        styleRules.push(styleRule);
      }
      return styleRules;
    },
    _rebuildStyleRules: function(node, styles) {
      var nodeComputedStyle = styles.computedStyle;
      this.sections = {};
      var styleRules = [];
      styleRules.push({
        computedStyle: true,
        selectorText: "",
        style: nodeComputedStyle,
        editable: false
      });
      var styleAttributes = {};
      for (var name in styles.styleAttributes) {
        var attrStyle = {
          style: styles.styleAttributes[name],
          editable: false
        };
        attrStyle.selectorText = WebInspector.panels.elements.treeOutline.nodeNameToCorrectCase(node.nodeName) + "[" + name;
        if (node.getAttribute(name))
          attrStyle.selectorText += "=" + node.getAttribute(name);
        attrStyle.selectorText += "]";
        styleRules.push(attrStyle);
      }
      if (styles.inlineStyle && node.nodeType === Node.ELEMENT_NODE) {
        var inlineStyle = {
          selectorText: "element.style",
          style: styles.inlineStyle,
          isAttribute: true
        };
        styleRules.push(inlineStyle);
      }
      if (styles.matchedCSSRules.length)
        styleRules.push({
          isStyleSeparator: true,
          text: WebInspector.UIString("Matched CSS Rules")
        });
      for (var i = styles.matchedCSSRules.length - 1; i >= 0; --i) {
        var rule = styles.matchedCSSRules[i];
        styleRules.push({
          style: rule.style,
          selectorText: rule.selectorText,
          sourceURL: rule.sourceURL,
          rule: rule,
          editable: !!(rule.style && rule.style.id)
        });
      }
      var parentNode = node.parentNode;
      function insertInheritedNodeSeparator(node) {
        var entry = {};
        entry.isStyleSeparator = true;
        entry.node = node;
        styleRules.push(entry);
      }
      for (var parentOrdinal = 0; parentOrdinal < styles.inherited.length; ++parentOrdinal) {
        var parentStyles = styles.inherited[parentOrdinal];
        var separatorInserted = false;
        if (parentStyles.inlineStyle) {
          if (this._containsInherited(parentStyles.inlineStyle)) {
            var inlineStyle = {
              selectorText: WebInspector.UIString("Style Attribute"),
              style: parentStyles.inlineStyle,
              isAttribute: true,
              isInherited: true
            };
            if (!separatorInserted) {
              insertInheritedNodeSeparator(parentNode);
              separatorInserted = true;
            }
            styleRules.push(inlineStyle);
          }
        }
        for (var i = parentStyles.matchedCSSRules.length - 1; i >= 0; --i) {
          var rulePayload = parentStyles.matchedCSSRules[i];
          if (!this._containsInherited(rulePayload.style))
            continue;
          var rule = rulePayload;
          if (!separatorInserted) {
            insertInheritedNodeSeparator(parentNode);
            separatorInserted = true;
          }
          styleRules.push({
            style: rule.style,
            selectorText: rule.selectorText,
            sourceURL: rule.sourceURL,
            rule: rule,
            isInherited: true,
            editable: !!(rule.style && rule.style.id)
          });
        }
        parentNode = parentNode.parentNode;
      }
      return styleRules;
    },
    _markUsedProperties: function(styleRules, usedProperties, disabledComputedProperties) {
      var priorityUsed = false;
      for (var i = 0; i < styleRules.length; ++i) {
        var styleRule = styleRules[i];
        if (styleRule.computedStyle || styleRule.isStyleSeparator)
          continue;
        if (styleRule.section && styleRule.section.noAffect)
          continue;
        styleRule.usedProperties = {};
        var style = styleRule.style;
        var allProperties = style.allProperties;
        for (var j = 0; j < allProperties.length; ++j) {
          var property = allProperties[j];
          if (!property.isLive)
            continue;
          var name = property.name;
          if (!priorityUsed && property.priority.length)
            priorityUsed = true;
          if (!(name in usedProperties))
            styleRule.usedProperties[name] = true;
          if (name === "font") {
            styleRule.usedProperties["font-family"] = true;
            styleRule.usedProperties["font-size"] = true;
            styleRule.usedProperties["font-style"] = true;
            styleRule.usedProperties["font-variant"] = true;
            styleRule.usedProperties["font-weight"] = true;
            styleRule.usedProperties["line-height"] = true;
          }
        }
        for (var name in styleRules[i].usedProperties)
          usedProperties[name] = true;
      }
      if (priorityUsed) {
        var foundPriorityProperties = [];
        for (var i = (styleRules.length - 1); i >= 0; --i) {
          if (styleRules[i].computedStyle || styleRules[i].isStyleSeparator)
            continue;
          var style = styleRules[i].style;
          var allProperties = style.allProperties;
          for (var j = 0; j < allProperties.length; ++j) {
            var property = allProperties[j];
            if (!property.isLive)
              continue;
            var name = property.name;
            if (property.priority.length) {
              if (!(name in foundPriorityProperties))
                styleRules[i].usedProperties[name] = true;
              else
                delete styleRules[i].usedProperties[name];
              foundPriorityProperties[name] = true;
            } else if (name in foundPriorityProperties)
              delete styleRules[i].usedProperties[name];
          }
        }
      }
    },
    _refreshSectionsForStyleRules: function(styleRules, usedProperties, disabledComputedProperties, editedSection) {
      for (var i = 0; i < styleRules.length; ++i) {
        var styleRule = styleRules[i];
        var section = styleRule.section;
        if (styleRule.computedStyle) {
          section._disabledComputedProperties = disabledComputedProperties;
          section._usedProperties = usedProperties;
          section.update();
        } else {
          section._usedProperties = styleRule.usedProperties;
          section.update(section === editedSection);
        }
      }
    },
    _rebuildSectionsForStyleRules: function(styleRules, usedProperties, disabledComputedProperties, pseudoId, anchorElement) {
      anchorElement = anchorElement || null;
      var sections = [];
      var lastWasSeparator = true;
      for (var i = 0; i < styleRules.length; ++i) {
        var styleRule = styleRules[i];
        if (styleRule.isStyleSeparator) {
          var separatorElement = document.createElement("div");
          separatorElement.className = "styles-sidebar-separator";
          if (styleRule.node) {
            var link = WebInspector.panels.elements.linkifyNodeReference(styleRule.node);
            separatorElement.appendChild(document.createTextNode(WebInspector.UIString("Inherited from") + " "));
            separatorElement.appendChild(link);
            if (!sections.inheritedPropertiesSeparatorElement)
              sections.inheritedPropertiesSeparatorElement = separatorElement;
          } else if ("pseudoId" in styleRule) {
            var pseudoName = WebInspector.StylesSidebarPane.PseudoIdNames[styleRule.pseudoId];
            if (pseudoName)
              separatorElement.textContent = WebInspector.UIString("Pseudo ::%s element", pseudoName);
            else
              separatorElement.textContent = WebInspector.UIString("Pseudo element");
          } else
            separatorElement.textContent = styleRule.text;
          this.bodyElement.insertBefore(separatorElement, anchorElement);
          lastWasSeparator = true;
          continue;
        }
        var computedStyle = styleRule.computedStyle;
        var editable = styleRule.editable;
        if (typeof editable === "undefined")
          editable = true;
        if (computedStyle)
          var section = new WebInspector.ComputedStylePropertiesSection(styleRule, usedProperties, disabledComputedProperties, styleRules);
        else
          var section = new WebInspector.StylePropertiesSection(styleRule, editable, styleRule.isInherited, lastWasSeparator);
        section.pane = this;
        section.expanded = true;
        if (computedStyle) {
          this._computedStylePane.bodyElement.appendChild(section.element);
          lastWasSeparator = true;
        } else {
          this.bodyElement.insertBefore(section.element, anchorElement);
          lastWasSeparator = false;
        }
        sections.push(section);
      }
      return sections;
    },
    _containsInherited: function(style) {
      var properties = style.allProperties;
      for (var i = 0; i < properties.length; ++i) {
        var property = properties[i];
        if (property.isLive && property.name in WebInspector.StylesSidebarPane.InheritedProperties)
          return true;
      }
      return false;
    },
    _changeSetting: function(event) {
      var options = this.settingsSelectElement.options;
      var selectedOption = options[this.settingsSelectElement.selectedIndex];
      selectedOption.action(event);
      var selectedIndex = 0;
      for (var i = 0; i < options.length; ++i) {
        if (options[i].value === WebInspector.settings.colorFormat) {
          selectedIndex = i;
          break;
        }
      }
      this.settingsSelectElement.selectedIndex = selectedIndex;
    },
    _changeColorFormat: function(event) {
      var selectedOption = this.settingsSelectElement[this.settingsSelectElement.selectedIndex];
      WebInspector.settings.colorFormat = selectedOption.value;
      for (var pseudoId in this.sections) {
        var sections = this.sections[pseudoId];
        for (var i = 0; i < sections.length; ++i)
          sections[i].update(true);
      }
    },
    _createNewRule: function(event) {
      this.addBlankSection().startEditingSelector();
    },
    addBlankSection: function() {
      var blankSection = new WebInspector.BlankStylePropertiesSection(appropriateSelectorForNode(this.node, true));
      blankSection.pane = this;
      var elementStyleSection = this.sections[0][1];
      this.bodyElement.insertBefore(blankSection.element, elementStyleSection.element.nextSibling);
      this.sections[0].splice(2, 0, blankSection);
      return blankSection;
    },
    removeSection: function(section) {
      for (var pseudoId in this.sections) {
        var sections = this.sections[pseudoId];
        var index = sections.indexOf(section);
        if (index === -1)
          continue;
        sections.splice(index, 1);
        if (section.element.parentNode)
          section.element.parentNode.removeChild(section.element);
      }
    },
    registerShortcuts: function() {
      var section = WebInspector.shortcutsHelp.section(WebInspector.UIString("Styles Pane"));
      var shortcut = WebInspector.KeyboardShortcut;
      var keys = [shortcut.shortcutToString(shortcut.Keys.Tab), shortcut.shortcutToString(shortcut.Keys.Tab, shortcut.Modifiers.Shift)];
      section.addRelatedKeys(keys, WebInspector.UIString("Next/previous property"));
      keys = [shortcut.shortcutToString(shortcut.Keys.Up), shortcut.shortcutToString(shortcut.Keys.Down)];
      section.addRelatedKeys(keys, WebInspector.UIString("Increment/decrement value"));
      keys = [shortcut.shortcutToString(shortcut.Keys.Up, shortcut.Modifiers.Shift), shortcut.shortcutToString(shortcut.Keys.Down, shortcut.Modifiers.Shift)];
      section.addRelatedKeys(keys, WebInspector.UIString("Increment/decrement by %f", 10));
      keys = [shortcut.shortcutToString(shortcut.Keys.PageUp), shortcut.shortcutToString(shortcut.Keys.PageDown)];
      section.addRelatedKeys(keys, WebInspector.UIString("Increment/decrement by %f", 10));
      keys = [shortcut.shortcutToString(shortcut.Keys.PageUp, shortcut.Modifiers.Shift), shortcut.shortcutToString(shortcut.Keys.PageDown, shortcut.Modifiers.Shift)];
      section.addRelatedKeys(keys, WebInspector.UIString("Increment/decrement by %f", 100));
      keys = [shortcut.shortcutToString(shortcut.Keys.PageUp, shortcut.Modifiers.Alt), shortcut.shortcutToString(shortcut.Keys.PageDown, shortcut.Modifiers.Alt)];
      section.addRelatedKeys(keys, WebInspector.UIString("Increment/decrement by %f", 0.1));
    }
  };
  WebInspector.StylesSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
  WebInspector.ComputedStyleSidebarPane = function() {
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Computed Style"));
    var showInheritedCheckbox = new WebInspector.Checkbox(WebInspector.UIString("Show inherited"), "sidebar-pane-subtitle");
    this.titleElement.appendChild(showInheritedCheckbox.element);
    if (WebInspector.settings.showInheritedComputedStyleProperties) {
      this.bodyElement.addStyleClass("show-inherited");
      showInheritedCheckbox.checked = true;
    }
    function showInheritedToggleFunction(event) {
      WebInspector.settings.showInheritedComputedStyleProperties = showInheritedCheckbox.checked;
      if (WebInspector.settings.showInheritedComputedStyleProperties)
        this.bodyElement.addStyleClass("show-inherited");
      else
        this.bodyElement.removeStyleClass("show-inherited");
    }
    showInheritedCheckbox.addEventListener(showInheritedToggleFunction.bind(this));
  };
  WebInspector.ComputedStyleSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
  WebInspector.StylePropertiesSection = function(styleRule, editable, isInherited, isFirstSection) {
    WebInspector.PropertiesSection.call(this, "");
    this.element.className = "styles-section monospace" + (isFirstSection ? " first-styles-section" : "");
    this._selectorElement = document.createElement("span");
    this._selectorElement.textContent = styleRule.selectorText;
    this.titleElement.appendChild(this._selectorElement);
    if (Preferences.debugMode)
      this._selectorElement.addEventListener("click", this._debugShowStyle.bind(this), false);
    var openBrace = document.createElement("span");
    openBrace.textContent = " {";
    this.titleElement.appendChild(openBrace);
    var closeBrace = document.createElement("div");
    closeBrace.textContent = "}";
    this.element.appendChild(closeBrace);
    this._selectorElement.addEventListener("dblclick", this._handleSelectorDoubleClick.bind(this), false);
    this.element.addEventListener("dblclick", this._handleEmptySpaceDoubleClick.bind(this), false);
    this.styleRule = styleRule;
    this.rule = this.styleRule.rule;
    this.editable = editable;
    this.isInherited = isInherited;
    var isUserAgent = this.rule && this.rule.isUserAgent;
    var isUser = this.rule && this.rule.isUser;
    var isViaInspector = this.rule && this.rule.isViaInspector;
    if (isUserAgent || isUser)
      this.editable = false;
    this._usedProperties = styleRule.usedProperties;
    if (this.rule)
      this.titleElement.addStyleClass("styles-selector");
    function linkifyUncopyable(url, line) {
      var link = WebInspector.linkifyResourceAsNode(url, "resources", line + 1);
      link.setAttribute("data-uncopyable", link.textContent);
      link.textContent = "";
      return link;
    }
    var subtitle = "";
    if (this.styleRule.sourceURL)
      this.subtitleElement.appendChild(linkifyUncopyable(this.styleRule.sourceURL, this.rule.sourceLine));
    else if (isUserAgent)
      subtitle = WebInspector.UIString("user agent stylesheet");
    else if (isUser)
      subtitle = WebInspector.UIString("user stylesheet");
    else if (isViaInspector)
      subtitle = WebInspector.UIString("via inspector");
    else if (this.rule && this.rule.sourceURL)
      this.subtitleElement.appendChild(linkifyUncopyable(this.rule.sourceURL, this.rule.sourceLine));
    if (isInherited)
      this.element.addStyleClass("show-inherited");
    if (subtitle)
      this.subtitle = subtitle;
    this.identifier = styleRule.selectorText;
    if (this.subtitle)
      this.identifier += ":" + this.subtitle;
    if (!this.editable)
      this.element.addStyleClass("read-only");
  };
  WebInspector.StylePropertiesSection.prototype = {
    collapse: function(dontRememberState) {},
    isPropertyInherited: function(propertyName) {
      if (this.isInherited) {
        return !(propertyName in WebInspector.StylesSidebarPane.InheritedProperties);
      }
      return false;
    },
    isPropertyOverloaded: function(propertyName, shorthand) {
      if (!this._usedProperties || this.noAffect)
        return false;
      if (this.isInherited && !(propertyName in WebInspector.StylesSidebarPane.InheritedProperties)) {
        return false;
      }
      var used = (propertyName in this._usedProperties);
      if (used || !shorthand)
        return !used;
      var longhandProperties = this.styleRule.style.getLonghandProperties(propertyName);
      for (var j = 0; j < longhandProperties.length; ++j) {
        var individualProperty = longhandProperties[j];
        if (individualProperty.name in this._usedProperties)
          return false;
      }
      return true;
    },
    nextEditableSibling: function() {
      var curSection = this;
      do {
        curSection = curSection.nextSibling;
      } while (curSection && !curSection.editable);
      return curSection;
    },
    previousEditableSibling: function() {
      var curSection = this;
      do {
        curSection = curSection.previousSibling;
      } while (curSection && !curSection.editable);
      return curSection;
    },
    update: function(full) {
      if (full) {
        this.propertiesTreeOutline.removeChildren();
        this.populated = false;
      } else {
        var child = this.propertiesTreeOutline.children[0];
        while (child) {
          child.overloaded = this.isPropertyOverloaded(child.name, child.shorthand);
          child = child.traverseNextTreeElement(false, null, true);
        }
      }
      this.afterUpdate();
    },
    afterUpdate: function() {
      if (this._afterUpdate) {
        this._afterUpdate(this);
        delete this._afterUpdate;
      }
    },
    onpopulate: function() {
      var style = this.styleRule.style;
      var handledProperties = {};
      var shorthandNames = {};
      this.uniqueProperties = [];
      var allProperties = style.allProperties;
      for (var i = 0; i < allProperties.length; ++i)
        this.uniqueProperties.push(allProperties[i]);
      for (var i = 0; i < this.uniqueProperties.length; ++i) {
        var property = this.uniqueProperties[i];
        if (property.disabled)
          continue;
        if (property.shorthand)
          shorthandNames[property.shorthand] = true;
      }
      for (var i = 0; i < this.uniqueProperties.length; ++i) {
        var property = this.uniqueProperties[i];
        var disabled = property.disabled;
        if (!disabled && this.disabledComputedProperties && !(property.name in this.usedProperties) && property.name in this.disabledComputedProperties)
          disabled = true;
        var shorthand = !disabled ? property.shorthand : null;
        if (shorthand && shorthand in handledProperties)
          continue;
        if (shorthand) {
          property = style.getLiveProperty(shorthand);
          if (!property)
            property = new WebInspector.CSSProperty(style, style.allProperties.length, shorthand, style.getShorthandValue(shorthand), style.getShorthandPriority(shorthand), "style", true, true, "");
        }
        var isShorthand = !!(property.isLive && (shorthand || shorthandNames[property.name]));
        var inherited = this.isPropertyInherited(property.name);
        var overloaded = this.isPropertyOverloaded(property.name, isShorthand);
        var item = new WebInspector.StylePropertyTreeElement(this.styleRule, style, property, isShorthand, inherited, overloaded);
        this.propertiesTreeOutline.appendChild(item);
        handledProperties[property.name] = property;
      }
    },
    findTreeElementWithName: function(name) {
      var treeElement = this.propertiesTreeOutline.children[0];
      while (treeElement) {
        if (treeElement.name === name)
          return treeElement;
        treeElement = treeElement.traverseNextTreeElement(true, null, true);
      }
      return null;
    },
    addNewBlankProperty: function(optionalIndex) {
      var style = this.styleRule.style;
      var property = style.newBlankProperty();
      var item = new WebInspector.StylePropertyTreeElement(this.styleRule, style, property, false, false, false);
      this.propertiesTreeOutline.appendChild(item);
      item.listItemElement.textContent = "";
      item._newProperty = true;
      item.updateTitle();
      return item;
    },
    _debugShowStyle: function(anchor) {
      var boundHandler;
      function removeStyleBox(element, event) {
        if (event.target === element) {
          event.stopPropagation();
          return;
        }
        document.body.removeChild(element);
        document.getElementById("main").removeEventListener("mousedown", boundHandler, true);
      }
      if (!event.shiftKey)
        return;
      var container = document.createElement("div");
      var element = document.createElement("span");
      container.appendChild(element);
      element.style.background = "yellow";
      element.style.display = "inline-block";
      container.style.cssText = "z-index: 2000000; position: absolute; top: 50px; left: 50px; white-space: pre; overflow: auto; background: white; font-family: monospace; font-size: 12px; border: 1px solid black; opacity: 0.85; -webkit-user-select: text; padding: 2px;";
      container.style.width = (document.body.offsetWidth - 100) + "px";
      container.style.height = (document.body.offsetHeight - 100) + "px";
      document.body.appendChild(container);
      if (this.rule)
        element.textContent = this.rule.selectorText + " {" + ((this.styleRule.style.cssText !== undefined) ? this.styleRule.style.cssText : "<no cssText>") + "}";
      else
        element.textContent = this.styleRule.style.cssText;
      boundHandler = removeStyleBox.bind(null, container);
      document.getElementById("main").addEventListener("mousedown", boundHandler, true);
    },
    _handleEmptySpaceDoubleClick: function(event) {
      if (event.target.hasStyleClass("header")) {
        event.stopPropagation();
        return;
      }
      this.expand();
      this.addNewBlankProperty().startEditing();
    },
    _handleSelectorClick: function(event) {
      event.stopPropagation();
    },
    _handleSelectorDoubleClick: function(event) {
      this._startEditingOnMouseEvent();
      event.stopPropagation();
    },
    _startEditingOnMouseEvent: function() {
      if (!this.editable)
        return;
      if (!this.rule && this.propertiesTreeOutline.children.length === 0) {
        this.expand();
        this.addNewBlankProperty().startEditing();
        return;
      }
      if (!this.rule)
        return;
      this.startEditingSelector();
    },
    startEditingSelector: function() {
      var element = this._selectorElement;
      if (WebInspector.isBeingEdited(element))
        return;
      WebInspector.startEditing(this._selectorElement, {
        context: null,
        commitHandler: this.editingSelectorCommitted.bind(this),
        cancelHandler: this.editingSelectorCancelled.bind(this)
      });
      window.getSelection().setBaseAndExtent(element, 0, element, 1);
    },
    editingSelectorCommitted: function(element, newContent, oldContent, context, moveDirection) {
      function moveToNextIfNeeded() {
        if (!moveDirection)
          return;
        if (moveDirection === "forward") {
          this.expand();
          if (this.propertiesTreeOutline.children.length === 0)
            this.addNewBlankProperty().startEditing();
          else {
            var item = this.propertiesTreeOutline.children[0];
            item.startEditing(item.nameElement);
          }
        } else {
          var previousSection = this.previousEditableSibling();
          if (!previousSection)
            return;
          previousSection.expand();
          previousSection.addNewBlankProperty().startEditing();
        }
      }
      if (newContent === oldContent)
        return moveToNextIfNeeded.call(this);
      var self = this;
      function successCallback(newRule, doesAffectSelectedNode) {
        if (!doesAffectSelectedNode) {
          self.noAffect = true;
          self.element.addStyleClass("no-affect");
        } else {
          delete self.noAffect;
          self.element.removeStyleClass("no-affect");
        }
        self.rule = newRule;
        self.styleRule = {
          section: self,
          style: newRule.style,
          selectorText: newRule.selectorText,
          sourceURL: newRule.sourceURL,
          rule: newRule
        };
        var oldIdentifier = this.identifier;
        self.identifier = newRule.selectorText + ":" + self.subtitleElement.textContent;
        self.pane.update();
        WebInspector.panels.elements.renameSelector(oldIdentifier, this.identifier, oldContent, newContent);
        moveToNextIfNeeded.call(self);
      }
      var focusedNode = WebInspector.panels.elements.focusedDOMNode;
      WebInspector.cssModel.setRuleSelector(this.rule.id, focusedNode ? focusedNode.id : 0, newContent, successCallback, moveToNextIfNeeded.bind(this));
    },
    editingSelectorCancelled: function() {}
  };
  WebInspector.StylePropertiesSection.prototype.__proto__ = WebInspector.PropertiesSection.prototype;
  WebInspector.ComputedStylePropertiesSection = function(styleRule, usedProperties, disabledComputedProperties) {
    WebInspector.PropertiesSection.call(this, "");
    this.headerElement.addStyleClass("hidden");
    this.element.className = "styles-section monospace first-styles-section read-only computed-style";
    this.styleRule = styleRule;
    this._usedProperties = usedProperties;
    this._disabledComputedProperties = disabledComputedProperties;
    this._alwaysShowComputedProperties = {
      "display": true,
      "height": true,
      "width": true
    };
    this.computedStyle = true;
    this._propertyTreeElements = {};
    this._expandedPropertyNames = {};
  };
  WebInspector.ComputedStylePropertiesSection.prototype = {
    collapse: function(dontRememberState) {},
    _isPropertyInherited: function(propertyName) {
      return !(propertyName in this._usedProperties) && !(propertyName in this._alwaysShowComputedProperties) && !(propertyName in this._disabledComputedProperties);
    },
    update: function() {
      this._expandedPropertyNames = {};
      for (var name in this._propertyTreeElements) {
        if (this._propertyTreeElements[name].expanded)
          this._expandedPropertyNames[name] = true;
      }
      this._propertyTreeElements = {};
      this.propertiesTreeOutline.removeChildren();
      this.populated = false;
    },
    onpopulate: function() {
      function sorter(a, b) {
        return a.name.localeCompare(b.name);
      }
      var style = this.styleRule.style;
      var uniqueProperties = [];
      var allProperties = style.allProperties;
      for (var i = 0; i < allProperties.length; ++i)
        uniqueProperties.push(allProperties[i]);
      uniqueProperties.sort(sorter);
      this._propertyTreeElements = {};
      for (var i = 0; i < uniqueProperties.length; ++i) {
        var property = uniqueProperties[i];
        var inherited = this._isPropertyInherited(property.name);
        var item = new WebInspector.StylePropertyTreeElement(this.styleRule, style, property, false, inherited, false);
        this.propertiesTreeOutline.appendChild(item);
        this._propertyTreeElements[property.name] = item;
      }
    },
    rebuildComputedTrace: function(sections) {
      for (var i = 0; i < sections.length; ++i) {
        var section = sections[i];
        if (section.computedStyle || section instanceof WebInspector.BlankStylePropertiesSection)
          continue;
        for (var j = 0; j < section.uniqueProperties.length; ++j) {
          var property = section.uniqueProperties[j];
          if (property.disabled)
            continue;
          if (section.isInherited && !(property.name in WebInspector.StylesSidebarPane.InheritedProperties))
            continue;
          var treeElement = this._propertyTreeElements[property.name];
          if (treeElement) {
            var selectorText = section.styleRule.selectorText;
            var value = property.value;
            var title = "<span style='color: gray'>" + selectorText + "</span> - " + value;
            var subtitle = " <span style='float:right'>" + section.subtitleElement.innerHTML + "</span>";
            var childElement = new TreeElement(null, null, false);
            childElement.titleHTML = title + subtitle;
            treeElement.appendChild(childElement);
            if (section.isPropertyOverloaded(property.name))
              childElement.listItemElement.addStyleClass("overloaded");
          }
        }
      }
      for (var name in this._expandedPropertyNames) {
        if (name in this._propertyTreeElements)
          this._propertyTreeElements[name].expand();
      }
    }
  };
  WebInspector.ComputedStylePropertiesSection.prototype.__proto__ = WebInspector.PropertiesSection.prototype;
  WebInspector.BlankStylePropertiesSection = function(defaultSelectorText) {
    WebInspector.StylePropertiesSection.call(this, {
      selectorText: defaultSelectorText,
      rule: {isViaInspector: true}
    }, true, false, false);
    this.element.addStyleClass("blank-section");
  };
  WebInspector.BlankStylePropertiesSection.prototype = {
    expand: function() {},
    editingSelectorCommitted: function(element, newContent, oldContent, context) {
      var self = this;
      function successCallback(newRule, doesSelectorAffectSelectedNode) {
        var styleRule = {
          section: self,
          style: newRule.style,
          selectorText: newRule.selectorText,
          sourceURL: newRule.sourceURL,
          rule: newRule
        };
        self.makeNormal(styleRule);
        if (!doesSelectorAffectSelectedNode) {
          self.noAffect = true;
          self.element.addStyleClass("no-affect");
        }
        self.subtitleElement.textContent = WebInspector.UIString("via inspector");
        self.expand();
        self.addNewBlankProperty().startEditing();
      }
      WebInspector.cssModel.addRule(this.pane.node.id, newContent, successCallback, this.editingSelectorCancelled.bind(this));
    },
    editingSelectorCancelled: function() {
      this.pane.removeSection(this);
    },
    makeNormal: function(styleRule) {
      this.element.removeStyleClass("blank-section");
      this.styleRule = styleRule;
      this.rule = styleRule.rule;
      this.identifier = styleRule.selectorText + ":via inspector";
      this.__proto__ = WebInspector.StylePropertiesSection.prototype;
    }
  };
  WebInspector.BlankStylePropertiesSection.prototype.__proto__ = WebInspector.StylePropertiesSection.prototype;
  WebInspector.StylePropertyTreeElement = function(styleRule, style, property, shorthand, inherited, overloaded) {
    this._styleRule = styleRule;
    this.style = style;
    this.property = property;
    this.shorthand = shorthand;
    this._inherited = inherited;
    this._overloaded = overloaded;
    TreeElement.call(this, "", null, shorthand);
  };
  WebInspector.StylePropertyTreeElement.prototype = {
    get inherited() {
      return this._inherited;
    },
    set inherited(x) {
      if (x === this._inherited)
        return;
      this._inherited = x;
      this.updateState();
    },
    get overloaded() {
      return this._overloaded;
    },
    set overloaded(x) {
      if (x === this._overloaded)
        return;
      this._overloaded = x;
      this.updateState();
    },
    get disabled() {
      return this.property.disabled;
    },
    get name() {
      if (!this.disabled || !this.property.text)
        return this.property.name;
      var text = this.property.text;
      var index = text.indexOf(":");
      if (index < 1)
        return this.property.name;
      return text.substring(0, index).trim();
    },
    get priority() {
      if (this.disabled)
        return "";
      return this.property.priority;
    },
    get value() {
      if (!this.disabled || !this.property.text)
        return this.property.value;
      var match = this.property.text.match(/(.*);\s*/);
      if (!match || !match[1])
        return this.property.value;
      var text = match[1];
      var index = text.indexOf(":");
      if (index < 1)
        return this.property.value;
      return text.substring(index + 1).trim();
    },
    get parsedOk() {
      return this.property.parsedOk;
    },
    onattach: function() {
      this.updateTitle();
    },
    updateTitle: function() {
      var value = this.value;
      this.updateState();
      var enabledCheckboxElement;
      if (this.parsedOk) {
        enabledCheckboxElement = document.createElement("input");
        enabledCheckboxElement.className = "enabled-button";
        enabledCheckboxElement.type = "checkbox";
        enabledCheckboxElement.checked = !this.disabled;
        enabledCheckboxElement.addEventListener("change", this.toggleEnabled.bind(this), false);
      }
      var nameElement = document.createElement("span");
      nameElement.className = "webkit-css-property";
      nameElement.textContent = this.name;
      this.nameElement = nameElement;
      var valueElement = document.createElement("span");
      valueElement.className = "value";
      this.valueElement = valueElement;
      if (value) {
        var self = this;
        function processValue(regex, processor, nextProcessor, valueText) {
          var container = document.createDocumentFragment();
          var items = valueText.replace(regex, "\0$1\0").split("\0");
          for (var i = 0; i < items.length; ++i) {
            if ((i % 2) === 0) {
              if (nextProcessor)
                container.appendChild(nextProcessor(items[i]));
              else
                container.appendChild(document.createTextNode(items[i]));
            } else {
              var processedNode = processor(items[i]);
              if (processedNode)
                container.appendChild(processedNode);
            }
          }
          return container;
        }
        function linkifyURL(url) {
          var hrefUrl = url;
          var match = hrefUrl.match(/['"]?([^'"]+)/);
          if (match)
            hrefUrl = match[1];
          var container = document.createDocumentFragment();
          container.appendChild(document.createTextNode("url("));
          if (self._styleRule.sourceURL)
            hrefUrl = WebInspector.completeURL(self._styleRule.sourceURL, hrefUrl);
          else if (WebInspector.panels.elements.focusedDOMNode)
            hrefUrl = WebInspector.resourceURLForRelatedNode(WebInspector.panels.elements.focusedDOMNode, hrefUrl);
          var hasResource = !!WebInspector.resourceForURL(hrefUrl);
          container.appendChild(WebInspector.linkifyURLAsNode(hrefUrl, url, null, hasResource));
          container.appendChild(document.createTextNode(")"));
          return container;
        }
        function processColor(text) {
          try {
            var color = new WebInspector.Color(text);
          } catch (e) {
            return document.createTextNode(text);
          }
          var swatchElement = document.createElement("span");
          swatchElement.title = WebInspector.UIString("Click to change color format");
          swatchElement.className = "swatch";
          swatchElement.style.setProperty("background-color", text);
          swatchElement.addEventListener("click", changeColorDisplay, false);
          swatchElement.addEventListener("dblclick", function(event) {
            event.stopPropagation();
          }, false);
          var format;
          if (WebInspector.settings.colorFormat === "original")
            format = "original";
          else if (Preferences.showColorNicknames && color.nickname)
            format = "nickname";
          else if (WebInspector.settings.colorFormat === "rgb")
            format = (color.simple ? "rgb" : "rgba");
          else if (WebInspector.settings.colorFormat === "hsl")
            format = (color.simple ? "hsl" : "hsla");
          else if (color.simple)
            format = (color.hasShortHex() ? "shorthex" : "hex");
          else
            format = "rgba";
          var colorValueElement = document.createElement("span");
          colorValueElement.textContent = color.toString(format);
          function nextFormat(curFormat) {
            switch (curFormat) {
              case "original":
                return color.simple ? "rgb" : "rgba";
              case "rgb":
              case "rgba":
                return color.simple ? "hsl" : "hsla";
              case "hsl":
              case "hsla":
                if (color.nickname)
                  return "nickname";
                if (color.simple)
                  return color.hasShortHex() ? "shorthex" : "hex";
                else
                  return "original";
              case "shorthex":
                return "hex";
              case "hex":
                return "original";
              case "nickname":
                if (color.simple)
                  return color.hasShortHex() ? "shorthex" : "hex";
                else
                  return "original";
              default:
                return null;
            }
          }
          function changeColorDisplay(event) {
            do {
              format = nextFormat(format);
              var currentValue = color.toString(format || "");
            } while (format && currentValue === color.value && format !== "original");
            if (format)
              colorValueElement.textContent = currentValue;
          }
          var container = document.createDocumentFragment();
          container.appendChild(swatchElement);
          container.appendChild(colorValueElement);
          return container;
        }
        var colorRegex = /((?:rgb|hsl)a?\([^)]+\)|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|\b\w+\b(?!-))/g;
        var colorProcessor = processValue.bind(window, colorRegex, processColor, null);
        valueElement.appendChild(processValue(/url\(\s*([^)\s]+)\s*\)/g, linkifyURL, colorProcessor, value));
      }
      this.listItemElement.removeChildren();
      nameElement.normalize();
      valueElement.normalize();
      if (!this.treeOutline)
        return;
      if (enabledCheckboxElement && this.treeOutline.section && this.treeOutline.section.editable && this.parent.root)
        this.listItemElement.appendChild(enabledCheckboxElement);
      this.listItemElement.appendChild(nameElement);
      this.listItemElement.appendChild(document.createTextNode(": "));
      this.listItemElement.appendChild(valueElement);
      this.listItemElement.appendChild(document.createTextNode(";"));
      if (!this.parsedOk) {
        this.hasChildren = false;
        this.listItemElement.addStyleClass("not-parsed-ok");
      }
      if (this.property.inactive)
        this.listItemElement.addStyleClass("inactive");
      this.tooltip = this.property.propertyText;
    },
    updateAll: function(updateAllRules) {
      if (!this.treeOutline)
        return;
      if (updateAllRules && this.treeOutline.section && this.treeOutline.section.pane)
        this.treeOutline.section.pane.update(null, this.treeOutline.section);
      else if (this.treeOutline.section)
        this.treeOutline.section.update(true);
      else
        this.updateTitle();
    },
    toggleEnabled: function(event) {
      var disabled = !event.target.checked;
      function callback(newStyle) {
        if (!newStyle)
          return;
        this.style = newStyle;
        this._styleRule.style = newStyle;
        if (this.treeOutline.section && this.treeOutline.section.pane)
          this.treeOutline.section.pane.dispatchEventToListeners("style property toggled");
        this.updateAll(true);
      }
      this.property.setDisabled(disabled, callback.bind(this));
    },
    updateState: function() {
      if (!this.listItemElement)
        return;
      if (this.style.isPropertyImplicit(this.name) || this.value === "initial")
        this.listItemElement.addStyleClass("implicit");
      else
        this.listItemElement.removeStyleClass("implicit");
      this.selectable = !this.inherited;
      if (this.inherited)
        this.listItemElement.addStyleClass("inherited");
      else
        this.listItemElement.removeStyleClass("inherited");
      if (this.overloaded)
        this.listItemElement.addStyleClass("overloaded");
      else
        this.listItemElement.removeStyleClass("overloaded");
      if (this.disabled)
        this.listItemElement.addStyleClass("disabled");
      else
        this.listItemElement.removeStyleClass("disabled");
    },
    onpopulate: function() {
      if (this.children.length || !this.shorthand)
        return;
      var longhandProperties = this.style.getLonghandProperties(this.name);
      for (var i = 0; i < longhandProperties.length; ++i) {
        var name = longhandProperties[i].name;
        if (this.treeOutline.section) {
          var inherited = this.treeOutline.section.isPropertyInherited(name);
          var overloaded = this.treeOutline.section.isPropertyOverloaded(name);
        }
        var liveProperty = this.style.getLiveProperty(name);
        var item = new WebInspector.StylePropertyTreeElement(this._styleRule, this.style, liveProperty, false, inherited, overloaded);
        this.appendChild(item);
      }
    },
    ondblclick: function(event) {
      this.startEditing(event.target);
      event.stopPropagation();
    },
    restoreNameElement: function() {
      if (this.nameElement === this.listItemElement.querySelector(".webkit-css-property"))
        return;
      this.nameElement = document.createElement("span");
      this.nameElement.className = "webkit-css-property";
      this.nameElement.textContent = "";
      this.listItemElement.insertBefore(this.nameElement, this.listItemElement.firstChild);
    },
    startEditing: function(selectElement) {
      if (this.parent.shorthand)
        return;
      if (this.treeOutline.section && !this.treeOutline.section.editable)
        return;
      if (!selectElement)
        selectElement = this.nameElement;
      else
        selectElement = selectElement.enclosingNodeOrSelfWithClass("webkit-css-property") || selectElement.enclosingNodeOrSelfWithClass("value");
      var isEditingName = selectElement === this.nameElement;
      if (!isEditingName && selectElement !== this.valueElement) {
        isEditingName = false;
        selectElement = this.valueElement;
      }
      if (WebInspector.isBeingEdited(selectElement))
        return;
      var context = {
        expanded: this.expanded,
        hasChildren: this.hasChildren,
        keyDownListener: isEditingName ? null : this.editingValueKeyDown.bind(this),
        isEditingName: isEditingName
      };
      this.hasChildren = false;
      if (!isEditingName)
        selectElement.addEventListener("keydown", context.keyDownListener, false);
      if (selectElement.parentElement)
        selectElement.parentElement.addStyleClass("child-editing");
      selectElement.textContent = selectElement.textContent;
      function shouldCommitValueSemicolon(text, cursorPosition) {
        var openQuote = "";
        for (var i = 0; i < cursorPosition; ++i) {
          var ch = text[i];
          if (ch === "\\" && openQuote !== "")
            ++i;
          else if (!openQuote && (ch === "\"" || ch === "'"))
            openQuote = ch;
          else if (openQuote === ch)
            openQuote = "";
        }
        return !openQuote;
      }
      function nameValueFinishHandler(context, isEditingName, event) {
        var isFieldInputTerminated = (event.keyCode === WebInspector.KeyboardShortcut.Keys.Semicolon.code) && (isEditingName ? event.shiftKey : (!event.shiftKey && shouldCommitValueSemicolon(event.target.textContent, event.target.selectionLeftOffset)));
        if (isEnterKey(event) || isFieldInputTerminated) {
          event.preventDefault();
          return "move-forward";
        } else if (event.keyCode === WebInspector.KeyboardShortcut.Keys.Esc.code)
          return "cancel";
        else if (!isEditingName && this._newProperty && event.keyCode === WebInspector.KeyboardShortcut.Keys.Backspace.code) {
          var selection = window.getSelection();
          if (selection.isCollapsed && !selection.focusOffset) {
            event.preventDefault();
            return "move-backward";
          }
        } else if (event.keyIdentifier === "U+0009")
          return "move-" + (event.shiftKey ? "backward" : "forward");
      }
      function pasteHandler(context, event) {
        var data = event.clipboardData.getData("Text");
        if (!data)
          return;
        var colonIdx = data.indexOf(":");
        if (colonIdx < 0)
          return;
        var name = data.substring(0, colonIdx).trim();
        var value = data.substring(colonIdx + 1).trim();
        event.preventDefault();
        if (!("originalName" in context)) {
          context.originalName = this.nameElement.textContent;
          context.originalValue = this.valueElement.textContent;
        }
        this.nameElement.textContent = name;
        this.valueElement.textContent = value;
        this.nameElement.normalize();
        this.valueElement.normalize();
        return "move-forward";
      }
      WebInspector.startEditing(selectElement, {
        context: context,
        commitHandler: this.editingCommitted.bind(this),
        cancelHandler: this.editingCancelled.bind(this),
        customFinishHandler: nameValueFinishHandler.bind(this, context, isEditingName),
        pasteHandler: isEditingName ? pasteHandler.bind(this, context) : null
      });
      this._prompt = new WebInspector.StylesSidebarPane.CSSPropertyPrompt(selectElement, isEditingName ? WebInspector.cssNameCompletions : WebInspector.CSSKeywordCompletions.forProperty(this.nameElement.textContent));
      window.getSelection().setBaseAndExtent(selectElement, 0, selectElement, 1);
    },
    editingValueKeyDown: function(event) {
      if (event.handled)
        return;
      var key = event.keyIdentifier || event.key;
      var arrowKeyPressed = (key === "Up" || key === "Down");
      var pageKeyPressed = (key === "PageUp" || key === "PageDown");
      if (!arrowKeyPressed && !pageKeyPressed)
        return;
      var selection = window.getSelection();
      if (!selection.rangeCount)
        return;
      var selectionRange = selection.getRangeAt(0);
      if (selectionRange.commonAncestorContainer !== this.valueElement && !selectionRange.commonAncestorContainer.isDescendant(this.valueElement))
        return;
      var wordRange = selectionRange.startContainer.rangeOfWord(selectionRange.startOffset, WebInspector.StylesSidebarPane.StyleValueDelimiters, this.valueElement);
      var wordString = wordRange.toString();
      var replacementString = wordString;
      var matches = /(.*?)(-?\d+(?:\.\d+)?)(.*)/.exec(wordString);
      if (matches && matches.length) {
        var prefix = matches[1];
        var number = parseFloat(matches[2]);
        var suffix = matches[3];
        var numberNearZero = (number < 1 && number > -1);
        if (number === 1 && key === "Down")
          numberNearZero = true;
        else if (number === -1 && key === "Up")
          numberNearZero = true;
        if (numberNearZero && event.altKey && arrowKeyPressed) {
          if (key === "Down")
            number = Math.ceil(number - 1);
          else
            number = Math.floor(number + 1);
        } else {
          var changeAmount = 1;
          if (event.shiftKey && pageKeyPressed)
            changeAmount = 100;
          else if (event.shiftKey || pageKeyPressed)
            changeAmount = 10;
          else if (event.altKey || numberNearZero)
            changeAmount = 0.1;
          if (key === "Down" || key === "PageDown")
            changeAmount *= -1;
          number = Number((number + changeAmount).toFixed(6));
        }
        replacementString = prefix + number + suffix;
        var replacementTextNode = document.createTextNode(replacementString);
        wordRange.deleteContents();
        wordRange.insertNode(replacementTextNode);
        var finalSelectionRange = document.createRange();
        finalSelectionRange.setStart(replacementTextNode, 0);
        finalSelectionRange.setEnd(replacementTextNode, replacementString.length);
        selection.removeAllRanges();
        selection.addRange(finalSelectionRange);
        event.handled = true;
        event.preventDefault();
        if (!("originalPropertyText" in this)) {
          this.originalPropertyText = this.property.propertyText;
        }
        this.applyStyleText(this.nameElement.textContent + ": " + this.valueElement.textContent);
      }
    },
    editingEnded: function(context) {
      this.hasChildren = context.hasChildren;
      if (context.expanded)
        this.expand();
      var editedElement = context.isEditingName ? this.nameElement : this.valueElement;
      if (!context.isEditingName)
        editedElement.removeEventListener("keydown", context.keyDownListener, false);
      if (editedElement.parentElement)
        editedElement.parentElement.removeStyleClass("child-editing");
      delete this.originalPropertyText;
    },
    editingCancelled: function(element, context) {
      this._removePrompt();
      if ("originalPropertyText" in this)
        this.applyStyleText(this.originalPropertyText, true);
      else {
        if (this._newProperty)
          this.treeOutline.removeChild(this);
        else
          this.updateTitle();
      }
      this.editingEnded(context);
    },
    editingCommitted: function(element, userInput, previousContent, context, moveDirection) {
      this._removePrompt();
      this.editingEnded(context);
      var isEditingName = context.isEditingName;
      var createNewProperty,
          moveToPropertyName,
          moveToSelector;
      var moveTo = this;
      var moveToOther = (isEditingName ^ (moveDirection === "forward"));
      var abandonNewProperty = this._newProperty && !userInput && (moveToOther || isEditingName);
      if (moveDirection === "forward" && !isEditingName || moveDirection === "backward" && isEditingName) {
        do {
          moveTo = (moveDirection === "forward" ? moveTo.nextSibling : moveTo.previousSibling);
        } while (moveTo && !moveTo.selectable);
        if (moveTo)
          moveToPropertyName = moveTo.name;
        else if (moveDirection === "forward" && (!this._newProperty || userInput))
          createNewProperty = true;
        else if (moveDirection === "backward" && this.treeOutline.section.rule)
          moveToSelector = true;
      }
      var blankInput = /^\s*$/.test(userInput);
      var isDataPasted = "originalName" in context;
      var isDirtyViaPaste = isDataPasted && (this.nameElement.textContent !== context.originalName || this.valueElement.textContent !== context.originalValue);
      var shouldCommitNewProperty = this._newProperty && (moveToOther || (!moveDirection && !isEditingName) || (isEditingName && blankInput));
      if (((userInput !== previousContent || isDirtyViaPaste) && !this._newProperty) || shouldCommitNewProperty) {
        this.treeOutline.section._afterUpdate = moveToNextCallback.bind(this, this._newProperty, !blankInput, this.treeOutline.section);
        var propertyText;
        if (blankInput || (this._newProperty && /^\s*$/.test(this.valueElement.textContent)))
          propertyText = "";
        else {
          if (isEditingName)
            propertyText = userInput + ": " + this.valueElement.textContent;
          else
            propertyText = this.nameElement.textContent + ": " + userInput;
        }
        this.applyStyleText(propertyText, true);
      } else {
        if (!isDataPasted && !this._newProperty)
          this.updateTitle();
        moveToNextCallback(this._newProperty, false, this.treeOutline.section);
      }
      var moveToIndex = moveTo && this.treeOutline ? this.treeOutline.children.indexOf(moveTo) : -1;
      function moveToNextCallback(alreadyNew, valueChanged, section) {
        if (!moveDirection)
          return;
        if (moveTo && moveTo.parent) {
          moveTo.startEditing(!isEditingName ? moveTo.nameElement : moveTo.valueElement);
          return;
        }
        if (moveTo && !moveTo.parent) {
          var propertyElements = section.propertiesTreeOutline.children;
          if (moveDirection === "forward" && blankInput && !isEditingName)
            --moveToIndex;
          if (moveToIndex >= propertyElements.length && !this._newProperty)
            createNewProperty = true;
          else {
            var treeElement = moveToIndex >= 0 ? propertyElements[moveToIndex] : null;
            if (treeElement) {
              treeElement.startEditing(!isEditingName ? treeElement.nameElement : treeElement.valueElement);
              return;
            } else if (!alreadyNew)
              moveToSelector = true;
          }
        }
        if (createNewProperty) {
          if (alreadyNew && !valueChanged && (isEditingName ^ (moveDirection === "backward")))
            return;
          section.addNewBlankProperty().startEditing();
          return;
        }
        if (abandonNewProperty) {
          var sectionToEdit = moveDirection === "backward" ? section : section.nextEditableSibling();
          if (sectionToEdit && sectionToEdit.rule)
            sectionToEdit.startEditingSelector();
          return;
        }
        if (moveToSelector)
          section.startEditingSelector();
      }
    },
    _removePrompt: function() {
      if (this._prompt) {
        this._prompt.removeFromElement();
        delete this._prompt;
      }
    },
    _hasBeenAppliedToPageViaUpDown: function() {
      return ("originalPropertyText" in this);
    },
    applyStyleText: function(styleText, updateInterface) {
      var section = this.treeOutline.section;
      var elementsPanel = WebInspector.panels.elements;
      styleText = styleText.replace(/\s/g, " ").trim();
      var styleTextLength = styleText.length;
      if (!styleTextLength && updateInterface && this._newProperty && !this._hasBeenAppliedToPageViaUpDown()) {
        this.parent.removeChild(this);
        section.afterUpdate();
        return;
      }
      function callback(newStyle) {
        if (!newStyle) {
          if (this._newProperty) {
            this.parent.removeChild(this);
            return;
          }
          if (updateInterface)
            this.updateTitle();
          return;
        }
        this.style = newStyle;
        this.property = newStyle.propertyAt(this.property.index);
        this._styleRule.style = this.style;
        if (section && section.pane)
          section.pane.dispatchEventToListeners("style edited");
        if (updateInterface)
          this.updateAll(true);
      }
      if (styleText.length && !/;\s*$/.test(styleText))
        styleText += ";";
      this.property.setText(styleText, updateInterface, callback.bind(this));
    }
  };
  WebInspector.StylePropertyTreeElement.prototype.__proto__ = TreeElement.prototype;
  WebInspector.StylesSidebarPane.CSSPropertyPrompt = function(element, cssCompletions) {
    WebInspector.TextPrompt.call(this, element, this._buildPropertyCompletions.bind(this), WebInspector.StylesSidebarPane.StyleValueDelimiters, true);
    this._cssCompletions = cssCompletions;
  };
  WebInspector.StylesSidebarPane.CSSPropertyPrompt.prototype = {
    upKeyPressed: function(event) {
      this._handleNameOrValueUpDown(event);
    },
    downKeyPressed: function(event) {
      this._handleNameOrValueUpDown(event);
    },
    tabKeyPressed: function(event) {
      this.acceptAutoComplete();
    },
    _handleNameOrValueUpDown: function(event) {
      var reverse = (event.keyIdentifier || event.key) === "Up";
      if (this.autoCompleteElement)
        this.complete(false, reverse);
      else {
        this._selectCurrentWordSuffix();
      }
      this.complete(false, reverse);
      event.handled = true;
    },
    _selectCurrentWordSuffix: function() {
      var selection = window.getSelection();
      if (!selection.rangeCount)
        return;
      var selectionRange = selection.getRangeAt(0);
      if (!selectionRange.commonAncestorContainer.isDescendant(this.element))
        return;
      var wordSuffixRange = selectionRange.startContainer.rangeOfWord(selectionRange.startOffset, WebInspector.StylesSidebarPane.StyleValueDelimiters, this.element, "forward");
      if (!wordSuffixRange.toString())
        return;
      selection.removeAllRanges();
      selection.addRange(wordSuffixRange);
    },
    _buildPropertyCompletions: function(wordRange, bestMatchOnly, completionsReadyCallback) {
      if (!this._cssCompletions)
        return;
      var prefix = wordRange.toString().toLowerCase();
      var results;
      if (bestMatchOnly) {
        results = [];
        var firstMatch = this._cssCompletions.firstStartsWith(prefix);
        if (firstMatch)
          results.push(firstMatch);
        return completionsReadyCallback(results);
      }
      results = this._cssCompletions.startsWith(prefix);
      if (results)
        completionsReadyCallback(results);
    }
  };
  WebInspector.StylesSidebarPane.CSSPropertyPrompt.prototype.__proto__ = WebInspector.TextPrompt.prototype;
})(require('process'));
