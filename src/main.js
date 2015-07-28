import {EventManager} from 'aurelia-framework';
import {TemplatingBindingLanguage} from 'aurelia-templating-binding';

function registerElement(eventManager, bindingLanguage, prototype) {
  var propertyConfig = {'bind-value': ['change']}; // Not explicitly listed for all elements that use it

  function handleProp(propName, prop) {
    if (prop.notify) {
      propertyConfig[propName] = ['change'];
    }
  }

  Object.keys(prototype.properties)
    .forEach(propName => handleProp(propName, prototype.properties[propName]));

  prototype.behaviors.forEach(behavior => {
    if (typeof behavior.properties != 'undefined') {
      Object.keys(behavior.properties)
        .forEach(propName => handleProp(propName, behavior.properties[propName]));
    }
  });

  eventManager.registerElementConfig({
    tagName: prototype.is,
    properties: propertyConfig
  });
}

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());

  let eventManager = aurelia.container.get(EventManager);
  let bindingLanguage = aurelia.container.get(TemplatingBindingLanguage);
  bindingLanguage.attributeMap['bind-value'] = 'bindValue';

  Polymer.telemetry.registrations.forEach(prototype => registerElement(eventManager, bindingLanguage, prototype));

  Array.observe(Polymer.telemetry.registrations, changes => {
    changes.forEach(change => {
      if (change.type === "splice" && change.addedCount > 0) {
        for (let i = 0; i < change.addedCount; i++) {
          let prototype = change.object[change.index + i - 1];
          registerElement(eventManager, bindingLanguage, prototype);
        }
      }
    })
  });

  console.log(bindingLanguage.attributeMap);
}
