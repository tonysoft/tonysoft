      function loadHelper() {
        window.addEventListener("resize", windowResize);
        var timerComponent = document.querySelector("#timerComponent");
        if (!timerComponent) {
          return;
        }
        var workoutReps = document.querySelector("#workoutReps") || timerComponent;
        workoutReps.addEventListener('reps', function(e) {
          switch (e.detail.action) {
            case "targetReps":
              var targetReps = document.querySelector("#targetReps");
              targetReps.value = e.detail.repetitionTarget;
              break;
            case "currentReps":
              workoutStatus();
              break;
            case "autoReset":
              if (timerComponent && !timerComponent.clockMode) {
                reset(null, true);
                pause();
              }
              break;
          }
        })
        setTimeout(function() {
          changeSize();
          windowResize();
          clockMode(null, true);
          var element = document.querySelector('generic-container');
          // var element = document.querySelector('time-piece');
          panzoom(element, {
            zoomDoubleClickSpeed: 1, 
          });
        }, 1000)
      }

      function workoutStatus() {
        var workoutReps = document.querySelector("#workoutReps");
        var target = workoutReps.repetitionTarget;
        var count = workoutReps.repetitionCount;
        var workoutStatus = document.querySelector("#workoutStatus");
        if (workoutStatus) {
          var pct = Number.parseFloat((count / target) * 100).toFixed(2);
          var status = `${count} / ${target} reps ( ${pct}% )`;
          workoutStatus.innerHTML = status;
        }
      }

      function windowResize(e) {
        var genericContainers = document.querySelectorAll("*[best-fit]");
        genericContainers.forEach(function(genericContainer) {
          if (genericContainer.bestFit) {
            var width = window.innerWidth;
            var height = window.innerHeight;
            genericContainer.scaleContent(width, height);
          }
        })
      }

      function clockMode(event, bClockMode) {
        if (event) {
          event.stopPropagation();
        }
        var timerComponent = document.querySelector("#timerComponent");
        if (timerComponent && timerComponent.pause) {
          timerComponent.clockMode = (bClockMode !== undefined) ? bClockMode : !timerComponent.clockMode;
          if (timerComponent.clockMode) {
            start();
          }
        }
      }

      function start(event) {
        if (event) {
          event.stopPropagation();
        }
        var timerComponent = document.querySelector("#timerComponent");
        if (timerComponent && timerComponent.start) {
          timerComponent.start();
        }
      }

      function pause(event) {
        if (event) {
          event.stopPropagation();
        }
        var timerComponent = document.querySelector("#timerComponent");
        if (timerComponent && timerComponent.pause) {
          timerComponent.pause();
        }
      }

      function eat(event) {
        event.stopPropagation();
      }

      function reset(event, bInternal) {
        if (event) {
          event.stopPropagation();
        }
        var timerComponent = document.querySelector("#timerComponent");
        var workoutReps = document.querySelector("#workoutReps") || timerComponent;
        if (timerComponent && timerComponent.reset) {
          timerComponent.reset();
        }
        if (workoutReps && workoutReps.reset && !bInternal) {
          workoutReps.reset();
          workoutStatus();
        }
        if (workoutReps && workoutReps.bumpReps) {
          var targetReps = document.querySelector("#targetReps");
          targetReps.value = workoutReps.repetitionTarget;
        }
        var menu = document.querySelector(".flex-menu");
      }

      function bumpReps(event, count) {
        if (event) {
          event.stopPropagation();
        }
        var timerComponent = document.querySelector("#timerComponent");
        var workoutReps = document.querySelector("#workoutReps") || timerComponent;
        if (workoutReps && workoutReps.bumpReps) {
          if (event && event.button === 2) {
            count *= -1;
          }
          var reps = workoutReps.bumpReps(count);
          var targetReps = document.querySelector("#targetReps");
          targetReps.value = reps.repetitionTarget;
        }
      }

      function setTargetReps(event) {
        var timerComponent = document.querySelector("#timerComponent");
        var workoutReps = document.querySelector("#workoutReps") || timerComponent;
        var timerComponent = document.querySelector("#timerComponent");
        if (workoutReps.setTargetReps) {
          var count = targetReps.value;
          workoutReps.setTargetReps(count);
        }
      }

      function changeSize(event) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        var timerComponent = document.querySelector("#timerComponent");
        if (timerComponent && timerComponent.pause) {
          var standardSize = parseInt(timerComponent.standardSize);
          var size = parseInt(timerComponent.size);
          var workoutReps = document.querySelector("#workoutReps")
          if (workoutReps) {
            var scale = size / standardSize;
            workoutReps.scale = scale;
          }
          if (event) {
            setTimeout(function() {
              switch (event.button) {
                case 2:
                  size -= 50;
                  break;
                default:
                  size += 50;
              }
              timerComponent.size = size;
            }, 50);
          }
        }
      }

      function cancelDefault(event) {
        event.preventDefault();
        return false;
      }

