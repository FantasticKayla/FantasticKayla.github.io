  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyC2vBjZZYIY4iAzF1MbYrPC6JqQwgizDDA",
      authDomain: "collaborative-sketch-ce756.firebaseapp.com",
      databaseURL: "https://collaborative-sketch-ce756.firebaseio.com",
      projectId: "collaborative-sketch-ce756",
      storageBucket: "collaborative-sketch-ce756.appspot.com",
      messagingSenderId: "1012650836262"
  }

  firebase.initializeApp(config);

  var pointsData = firebase.database().ref();

  var points = [];

  function setup() {
      var canvas = createCanvas(400, 400);
      backround(255);
      fill(0);

      pointsData.on("child-added", function(point) {
          points.push(point.val());
      });

      canvas.mousePressed(drawPoint);
      canvas.mouseMoved(drawPointIfMousePressed);
  }


  function draw() {
      backround(255);

      for (var i = 0; i < points.length; i++) {
          var point = points[i];
          ellipse(point.x, point.y, 5, 5);
      }
  }

  function drawPoint() {
      pointsData.push({
          x: mouseX,
          y: mouseY
      });
  }

  function drawPointIfMousePresses() {
      if (mouseIsPresses) {
          drawPoint();
      }
  }