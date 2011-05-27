var history;
var funcEditLined = false;
var roundAfter = 0.0000009;
var digitsAfterPoint = 11;

function init() {
  input = document.getElementById("caalc");
  history = document.getElementById("output");
  document.getElementById("func-edit").value = localStorage.getItem("customFuncs");
  try {
    eval(localStorage.getItem("customFuncs"))
  }catch(a) {
  }
  document.getElementById("output").innerHTML = localStorage.getItem("history");
  document.getElementById("output").innerHTML == "" && (document.getElementById("clean").style.display = "none");
  $("#output").linedtextarea();
  
  calckeydown = function(a) {
    input.value.length > 24 ? input.style.font = "bold 40px 'Century Gothic', Helvetica, sans" : input.style.fontSize = "64px";
    if (a.keyCode == 13 || a == "manual") {
      if (valid = /^[a-z0-9A-Z\-\*\+\/\(\)\.\,=,\^,!,#,\s,\%]+$/.test(input.value)) {
        original = input.value;
        input.value = inputFormatter(input);
        output = "E";
        try {
          output = eval(input.value)
        }catch(c) {
          input.value = "E"
        }
        if(output == original) {
          input.value = ""
        }
        else {
          if (output != "E") {
            Math.abs(output - Math.round(output)) > 0 && (dig = Math.pow(10, digitsAfterPoint), output = Math.round(output * dig) / dig), Math.abs(output - Math.round(output)) < roundAfter && (output = Math.round(output)), document.getElementById("output").innerHTML = original + " = " + output + "\n" + document.getElementById("output").innerHTML, input.value = output
          }
        }
        updateHistory()
      }else {
        input.value = "E"
      }
    }
  };
  
  input.onkeydown = calckeydown;
  omniboxInput = localStorage.getItem("fromOmnibox");
  if(omniboxInput != null && omniboxInput != "null") {
    input.value = omniboxInput, calckeydown("manual"), localStorage.setItem("fromOmnibox", null)
  }
  $("#wrench").click(function() {
    showCustomFuncEdit()
  });
  $("#closeFuncEdit").click(function() {
    hideCustomFuncEdit()
  });
  $("#func-edit").keydown(function(a) {
    if(a.keyCode == 27) {
      hideCustomFuncEdit()
    }else {
      if(a.keyCode == 9) {
        return false
      }
    }
  });
  $("#func-edit").change(function() {
    saveCustomFuncs()
  });
  $("#output").mousewheel(function(a, c) {
    var d = c > 0 ? -1 : 1, e = Math.abs(c);
    sT = $(this).scrollTop();
    $(this).scrollTop(sT + e * d * 20);
    return!1
  });
  $("#scroll-down").mousemove(function() {
    $("#output").scrollTop($("#output").scrollTop() + 15)
  })
}
var findReplace = [{find:/([a-z0-9\.]+|\([a-z0-9\(\)\.\-\*\+\/]+\))!/g, replace:pow($1, $2)}];

function inputFormatter(a) {
  a.value = a.value.replace(/sqrt/g, "Math.sqrt");
  a.value = a.value.replace(/([a-z0-9\.]+|\([a-z0-9\(\)\.\-\*\+\/]+\))\^([a-z0-9\.]+|\([a-z0-9\(\)\.\-\*\+\/]+\))/g, "pow($1, $2)");
  a.value = a.value.replace(/([a-z0-9\.]+|\([a-z0-9\(\)\.\-\*\+\/]+\))!/g, "factorial($1)");
  a.value = a.value.replace(/#([a-z0-9\.]+|\([a-z0-9\(\)\.\-\*\+\/]+\))/g, "gradToRad($1)");
  a.value = a.value.replace(/abs/g, "Math.abs");
  a.value = a.value.replace(/%/g, "/100*");
  a.value = a.value.replace(/acos/g, "Math.acos");
  a.value = a.value.replace(/asin/g, "Math.asin");
  a.value = a.value.replace(/atan2/g, "Math.atan2");
  a.value = a.value.replace(/([^a])cos/g, "$1Math.cos");
  a.value = a.value.replace(/([^a])sin/g, "$1Math.sin");
  a.value = a.value.replace(/([^a])tan/g, "$1Math.tan");
  a.value = a.value.replace(/^cos/g, "Math.cos");
  a.value = a.value.replace(/^sin/g, "Math.sin");
  a.value = a.value.replace(/^tan/g, "Math.tan");
  a.value = a.value.replace(/atan([^2])/g, "Math.atan$1");
  a.value = a.value.replace(/atan$/g, "Math.atan");
  a.value = a.value.replace(/ceil/g, "Math.ceil");
  a.value = a.value.replace(/exp/g, "Math.exp");
  a.value = a.value.replace(/floor/g, "Math.floor");
  a.value = a.value.replace(/logbase/g, "logab");
  a.value = a.value.replace(/logab/g, "logab");
  a.value = a.value.replace(/ln/g, "ln");
  a.value = a.value.replace(/log/g, "Math.log");
  a.value = a.value.replace(/base/g, "base");
  a.value = a.value.replace(/bin/g, "bin");
  a.value = a.value.replace(/dec/g, "dec");
  a.value = a.value.replace(/max/g, "Math.max");
  a.value = a.value.replace(/min/g, "Math.min");
  a.value = a.value.replace(/pow/g, "Math.pow");
  a.value = a.value.replace(/random/g, "Math.random()");
  a.value = a.value.replace(/round/g, "Math.round");
  a.value = a.value.replace(/([\-\*\+\/\(\)\s])e/g, "$1Math.E");
  a.value = a.value.replace(/^e/g, "Math.E");
  a.value = a.value.replace(/([\-\*\+\/\(\)\s])pi/g, "$1Math.PI");
  a.value = a.value.replace(/^pi/g, "Math.PI");
  a.value = a.value.replace(/answer/g, "42");
  return a.value
}
function showCustomFuncEdit() {
  $("#func-box").css("display", "block");
  $("#input-box").css("opacity", "0.2");
  $("#output-box").css("opacity", "0.2");
  funcEditLined || ($("#func-edit").linedtextarea(), funcEditLined = !0)
}
function hideCustomFuncEdit() {
  saveCustomFuncs();
  customFuncs = document.getElementById("func-edit").value;
  try {
    eval(customFuncs), $("#func-box").css("display", "none"), $("#input-box").css("opacity", "1"), $("#output-box").css("opacity", "1")
  }catch(a) {
    alert("There is an error in your custom functions")
  }
}
function saveCustomFuncs() {
  f = document.getElementById("func-edit").value;
  localStorage.setItem("customFuncs", f)
}
function updateHistory() {
  localStorage.setItem("history", document.getElementById("output").value);
  document.getElementById("output").value != "" && (document.getElementById("clean").style.display = "block")
}
function selectAll(a) {
  document.getElementById(a).focus();
  document.getElementById(a).select()
}
function cleanOutput() {
  document.getElementById("output").innerHTML = "";
  document.getElementById("output").value = "";
  localStorage.setItem("history", "");
  document.getElementById("clean").style.display = "none"
}
function factorial(a) {
  for(i = r = 1;i <= a;i++) {
    r *= i
  }
  return r
}
function gradToRad(a) {
  return a * Math.PI / 180
}
function logab(a, b) {
  return Math.log(a) / Math.log(b)
}
function lgn(a) {
  return Math.log(a) / Math.log(10)
}
function base(a, b, c) {
  return parseInt(a, c || 10).toString(b)
}
function bin(a) {
  return base(a, 2, 10)
}
function dec(a) {
  return base(a, 10, 2)
}
function mod(a, b) {
  return a % b
}