var options = {
  url: "resources/contries.json",

  getValue: "name",

  template: {
    type: "iconRight",
    fields: {
      iconSrc: "img"
    }
  },

  list: {
    showAnimation: {
      type: "slide"
    },
    hideAnimation: {
      type: "slide"
    }
  }
};

$("#provider-json").easyAutocomplete(options);
