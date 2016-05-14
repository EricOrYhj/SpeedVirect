'use strict';
$(document).ready(function () {
  (function() {
    var uri = new URI();
    var data = uri.search(true);
    var spinner;

    // Initialization
    updateComponents();
    activateButtons();
    activateSearchBar();
    activateSelect();
    updateTags();

    // Updates UI components
    function updateComponents() {
      uri = new URI();
      data = uri.search(true);

      updateFilters();

      // Objective control
      $("#objectives li input").removeAttr("checked").removeAttr("disabled");
      if ('objective' in data) {
        if ($.isArray(data.objective)) {
          $.each(data.objective, function(index, value) {
            $("#objectives input[value=" + value + "]").radiocheck('check');
          });
        } else {
          $("#objectives input[value=" + data.objective + "]").radiocheck('check');
        }
      } else {
        $("#objectives input[value='all']").radiocheck('check').attr('disabled', true);
      }

      // Category control
      $("#categories li input").removeAttr("checked").removeAttr("disabled");
      if ('category' in data) {
        if ($.isArray(data.category)) {
          $.each(data.category, function(index, value) {
            $("#categories input[value=" + value + "]").radiocheck('check');
          });
        } else {
          $("#categories input[value=" + data.category + "]").radiocheck('check');
        }
      } else {
        $("#categories input[value='all']").radiocheck('check').attr('disabled', true);
      }

      // Category control
      $("#budget li input").removeAttr("checked").removeAttr("disabled");
      if ('min' in data) {
        $("#budget input[data-min=" + data.min + "]").radiocheck('check');
      } else {
        $("#budget input[value='all']").radiocheck('check').attr('disabled', true);
      }

      // Tag control
      $("button[data-tag]").removeClass("selected");
      if ('tag' in data) {
        if ($.isArray(data.tag)) {
          $.each(data.tag, function(index, value) {
            $("button[data-tag='" + value + "']").addClass("selected");
          });
        } else {
          $("button[data-tag='" + data.tag + "']").addClass("selected");
        }
      }
      $('[data-toggle="tooltip"]').tooltip();
      // Search box text set and clear
      if ('search' in data) {
        if($("#search-box input[data-pjax]").val() != data.search) {
          $("#search-box input[data-pjax]").val(data.search);
        }
      }
      else {
        if($("#search-box input[data-pjax]").val()) {
          $("#search-box input[data-pjax]").val("");
        }
      }
      // Sorting feature
      if ('select' in data) {
        var option = $('#' + data.select);
        $('select[data-pjax]').val(option.text());
      }
    }

    function updateTags() {
      var uri = new URI();
      var tagsUrl = URI.build({path: "/tags/", query: uri.query()});

      $.ajax(tagsUrl).done(function(data) {
        $("#tags").html(data);
        updateComponents();

        // Activate tag buttons
        $("button[data-pjax]").click(function(e) {
          var tag = $(this).data('tag');
          var url = "";

          // Get and update tag list
          if (uri.hasQuery('tag', tag, true)) {
            url = uri.removeSearch('page').removeSearch({tag: tag});
            $(this).removeClass("selected");
          } else {
            url = uri.removeSearch('page').addSearch({tag: tag});
            $(this).addClass("selected");
          }
          $.pjax({url: url, container: '#videos'});
          updateComponents();
        });
      });
    }

    function updateFilters() {
      var uri = new URI();
      var filterInfoUrl = URI.build({path: "/api/videos/info/", query: uri.query()});

      $.ajax(filterInfoUrl).done(function(data) {
        for (var i in data.objectives) {
          $("#objective_"+i).text(data.objectives[i]);
          if (data.objectives[i] == 0) {
            $("#objective_"+i).siblings("input").attr('disabled', true);
          }
        }
        for (var i in data.categories) {
          $("#category_"+i).text(data.categories[i]);
          if (data.categories[i] == 0) {
            $("#category_"+i).siblings("input").attr('disabled', true);
          }
        }
        for (var i in data.price_list) {
          $("#price_"+i).text(data.price_list[i]);
          if (data.price_list[i] == 0) {
            $("#price_"+i).siblings("input").attr('disabled', true);
          }
        }
      });
    }

    // Activates checkbox & buttons
    function activateButtons() {
      $("#objectives input[data-pjax]").click(function(e) {
        var url = "";

        if (this.value === 'all') {
          if (this.checked) {
            url = uri.removeSearch('page').removeSearch('objective');
            $(this).attr('disabled', true);
          }
        } else {
          if (this.checked) {
            url = uri.removeSearch('page').addSearch({objective: this.value});
          } else {
            url = uri.removeSearch('page').removeSearch({objective: this.value});
          }
        }
        $.pjax({url: url, container: '#videos'});
        updateComponents();
      });

      $("#categories input[data-pjax]").click(function(e) {
        var url = "";

        if (this.value === 'all') {
          if (this.checked) {
            url = uri.removeSearch('page').removeSearch('category');
            $(this).attr('disabled', true);
          }
        } else {
          if (this.checked) {
            url = uri.removeSearch('page').addSearch({category: this.value});
          } else {
            url = uri.removeSearch('page').removeSearch({category: this.value});
          }
        }
        $.pjax({url: url, container: '#videos'});
        updateComponents();
      });

      $("#budget input[data-pjax]").click(function(e) {
        var url = "";
        var min_val = $(this).data('min');
        var max_val = $(this).data('max');

        uri.removeSearch(['min', 'max']);
        if (this.value === 'all') {
          if (this.checked) {
            url = uri.removeSearch('page').removeSearch(['min', 'max']);
            $(this).attr('disabled', true);
          }
        } else {
          if (this.checked) {
            url = uri.removeSearch('page').addSearch({min: min_val, max: max_val});
          } else {
            url = uri.removeSearch('page').removeSearch(['min', 'max']);
          }
        }
        $.pjax({url: url, container: '#videos'});
        updateComponents();
      });

      $("button[data-pjax]").click(function(e) {
        var tag = $(this).data('tag');
        var url = "";

        if (uri.hasQuery('tag', tag, true)) {
          url = uri.removeSearch('page').removeSearch({tag: tag});
          $(this).removeClass("selected");
        } else {
          url = uri.removeSearch('page').addSearch({tag: tag});
          $(this).addClass("selected");
        }
        $.pjax({url: url, container: '#videos'});
        updateComponents();
      });
    }

    function activateSearchBar() {
      function new_search(keyword) {
          var url = "";
          // Remove previous value and launch new search using pjax
          url = uri.removeSearch('page').removeSearch('search');
          url = uri.addSearch({search: keyword});
          $.pjax({url: url, container: '#videos'});
      }
      $("#search-box input[data-pjax]").keypress(function(e) {
        if (e.which == 13 && this.value) {
          new_search(this.value);
        }
      });
      $("#search-box button").click(function() {
        var input_value = $("#search-box input[data-pjax]").val()
        if (input_value) {
          new_search(input_value);
        }
      });

      if (data.search) {
        $("#clear-search").click(function() {
          var url = uri.removeSearch('page').removeSearch('search');
          $.pjax({url: url, container: '#videos'});
        });
      }
    }

    function activateSelect() {
      var select = $('select[data-pjax]');
      $('select[data-pjax]').change(function(e) {
        var url = '';
        var selected = $('select option:selected').attr('id');
        // Remove previous value and launch new search using pjax
        url = uri.removeSearch('page').removeSearch('select');
        url = uri.addSearch({select: selected});
        $.pjax({url: url, container: '#videos'});
        console.log(selected);
      });
    }

    // Pjax for pagination
    $(document).on('click', '#videos a[data-pjax]', function(e) {
      var container = $('#videos');
      var query = URI.parseQuery(e.target.getAttribute('href'));

      $.pjax.click(e, {url: uri.setSearch(query), container: container});
    });

    // show and hide spinner
    $(document).on('pjax:send', function() {
      spinner = new Spinner().spin(document.getElementById("spinner"));
    });

    $(document).on('pjax:complete', function() {
      updateTags();
      spinner.stop();
    });

    // support navigation
    $(document).on('pjax:popstate', function(direction) {
      updateComponents();
      updateTags();
    });
  })();
});
