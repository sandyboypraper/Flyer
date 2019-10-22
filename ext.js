function dropdowntabinit() {
  $(".section").hide();
  $("#1").show();
  console.log("1");
  // $("button").click(function() {
  //   console.log("hyy");
  //   $(".section").hide();
  //   $("#" + $(this).val()).show();
  //   if ($(this).val() == 8) init();
  // });

  $("#option").change(function() {
    $(".section").hide();
    $("#" + $(this).val()).show();
    if ($(this).val() == 8) init();
  });
}

$(document).ready(() => {
  //add button click

  $(".inlinebtn").click(() => {
    var t = $("input").val();

    $.getJSON("resources/contries.json", data => {
      console.log(data);

      var flag = 0;

      //fetch products
      $(".productsec").remove();
      $(".dropdowncat").remove();
      $(".section").remove();

      for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
        if (data[i].name == t) {
          flag = 1;

          //if yes then add
          const $ul = $("<ul>", {
            class: "productsec collection",
            id: data[i].code
          })
            .append(
              $("<li>", {
                class: "collection-item",
                text: data[i].name
              })
            )
            .append(
              $("<li>", { class: "collection-item", text: data[i].code })
            );

          $(".leftside").append($ul);

          break;
        }
      }

      console.log(flag);
      if (flag == 0) {
        const alert = `<div class="alert animated flash alert-danger" role="alert">
          please choose the valid product
        </div>`;

        $(".leftside").append(alert);
      }

      setTimeout(function() {
        $(".alert").hide();
      }, 2000);

      $("input").val("");
    });

    // append images of the selected product
    // API call for append data to productData.json

    // append into HTML
    $.getJSON("resources/productData.json", data => {
      var selectedProductId = $(".productsec").attr("id");

      for (var i = 0; i < data.length; i++) {
        if (data[i].product_pk == selectedProductId) {
          var ul = ` <div class="input-field dropdowncat col s12">
      <select id="option">
       `;

          var ind = 1;
          for (var key in data[i].images) {
            ul +=
              ` <option value="` +
              ind +
              `" class="option">` +
              key +
              `</option>`;
            ind++;
          }

          ul += `  </select>
      <label>Choose Category</label>
    </div>`;

          $(".leftside").append(ul);
          $("select").material_select();

          var ind = 1;
          for (var key in data[i].images) {
            var divv =
              ` <div class="section" id="` +
              ind +
              `">
            <div class="row">`;

            for (var j = 0; j < data[i].images[key].length; j++) {
              divv +=
                `  <div class="col s4 center" >
          <img class="thumbnail" src="` +
                data[i].images[key][j]["url"] +
                `" alt="" />
        </div>`;
            }

            divv += `</div></div>`;

            $(".leftside").append(divv);

            ind++;
          }

          dropdowntabinit();
          break;
        }
      }
    });
  });
});
