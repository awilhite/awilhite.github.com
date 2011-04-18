Raphael.el.tooltip = function(command, params) {
                  var tooltips = [];
                  var element = this;
                  this.set;

                  create = function(params) {
                        var createTip;
                        var createBox;
                        var startX;
                        var direction=params.direction;
                        var offset = params.offset || 0;
                        var opacity = params.opacity || 1;
                        var font = params.font || "arial";
                        var width=params.width || 150;
                        var height=params.height || 40;
                        var widthB=width+10;
                        var heightB=height+10;
                        var content=params.content;

                        direction == "left" ? startX=element.attr("x")-15-offset : startX=element.attr("x")+element.attr("width")+offset;
                        var centerY=element.attr("y") + element.attr("height") / 2;

                        if(direction=="left") {
                          startXB=element.attr("x")-offset-15
                        createTip="M"+startX+" "+(centerY-7.5)+"L"+startX+" "+(centerY+7.5)+"L"+(15+startX)+" "+ centerY+"L"+startX+" "+(centerY-7.5);
                        startX=element.attr("x")-offset-20;
                        createBBox="M"+(startXB-widthB)+" "+(centerY-heightB/2)+"L"+(startXB-widthB)+" "+(centerY+heightB/2)+ "L"+startXB+ " "+(centerY+heightB/2)+ "L"+startXB+ " "+(centerY-heightB/2)+"L"+(startXB-widthB)+" "+(centerY-heightB/2);
                        createIBox="M"+(startX-width)+" "+(centerY-height/2)+"L"+(startX-width)+" "+(centerY+height/2)+ "L"+startX+ " "+(centerY+height/2)+ "L"+startX+ " "+(centerY-height/2)+"L"+(startX-width)+" "+(centerY-height/2);
                        text=startX-width/2;
                        } else {
                          startXB=element.attr("x")+element.attr("width")+offset+15;
                        createTip="M"+startX+" "+ centerY + "L"+(startX+15)+" "+(centerY-7.5)+"L"+(startX+15)+" "+(centerY+7.5)+"L"+startX+" "+centerY;
                        startX=element.attr("x")+element.attr("width")+offset+20;
                        createBBox="M"+(startXB)+" "+(centerY-heightB/2)+"L"+(startXB)+" "+(centerY+heightB/2)+ "L"+(startXB+width+10) + " "+(centerY+heightB/2)+ "L"+(startXB+width+10) + " "+(centerY-heightB/2)+"L"+(startXB)+" "+(centerY-heightB/2);
                        createIBox="M"+(startX)+" "+(centerY-height/2)+"L"+(startX)+" "+(centerY+height/2)+ "L"+(startX+width)+ " "+(centerY+height/2)+ "L"+(startX+width)+ " "+(centerY-height/2)+"L"+(startX)+" "+(centerY-height/2);
                        text=startX+width/2;
                        }
              

                        border = r.path(createBBox).attr({stroke: "#303030", fill: "#303030", opacity: opacity}).hide();
                        back = r.path(createIBox).attr({stroke: "#404040", fill: "#404040", opacity: opacity}).hide();
                        text = r.text(text, centerY, content).attr({"font-size": 14, fill: "#f3f3f3", "font-family": font}).hide();
                        tip = r.path(createTip).attr({fill: "#303030", stroke: "#303030", opacity: opacity}).hide();
                        border.hide();
                        element.set = r.set().push(border, back, text, tip);
                  }
                  destroy = function() {
                        element.set.remove();
                  }
                  hide = function() {
                        element.set.hide();
                  }
                  show = function() {
                        element.set.show();
                  }
                  
                  if (command=="create") {

                   create(params);

                  }
                  else if (command=="destroy") {

                   destroy();

                  }
                  else if (command=="hide") {

                   hide();

                  }
                  else if (command=="show") {

                   show();

                  }
                  return element;
          
          };