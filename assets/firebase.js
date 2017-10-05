  var config = {
    apiKey: "AIzaSyAjMzb9YuW_Jbm9Y5-mV34T5_YPOSpxxzQ",
    authDomain: "train-scheduler-7e4a1.firebaseapp.com",
    databaseURL: "https://train-scheduler-7e4a1.firebaseio.com",
    projectId: "train-scheduler-7e4a1",
    storageBucket: "train-scheduler-7e4a1.appspot.com",
    messagingSenderId: "728452940852"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destinationCity = "";
  var firstTrain = "";
  var timedFrequency = "";
  var nextArrival = "";
  var minutesAway = "";


  $("#add-train").on("click", function(event) {
      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destinationCity = $("#destination").val().trim();
      firstTrain = $("#first-train").val().trim();
      timedFrequency = $("#frequency").val().trim();

      var trainData = {
          name: trainName,
          destination: destinationCity,
          time: firstTrain,
          frequency: timedFrequency
      };

      database.ref().push(trainData);

      console.log(trainData.name);
      console.log(trainData.destination);
      console.log(trainData.time);
      console.log(trainData.frequency);

      $("#train-name").val("");
      $("#destination").val("");
      $("#first-train").val("");
      $("#frequency").val("");
  });



  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);

      var trainName = childSnapshot.val().name;
      var destinationCity = childSnapshot.val().destination;
      var firstTrain = childSnapshot.val().time;
      var timedFrequency = childSnapshot.val().frequency;

      var currentTime = moment();
      console.log("Local Current Time: " + moment(currentTime).format("HH:mm"));

      var timeDifference = moment().diff(moment(currentTime), "minutes");
      console.log("Time Difference from Current Time to Next Train: " + timeDifference);

      var timeRemaining = timeDifference % timedFrequency;
      console.log(timeRemaining);

      var minutesAway = timedFrequency - timeRemaining;
      console.log("Minutes Away from Next Arrival: " + minutesAway);

      var nextArrival = moment().add(minutesAway, "minutes");
      console.log("Next Train Arrival Time: " + moment(nextArrival).format("HH:mm"));

      $("#table > tbody").append(("<tr><td>" + trainName + "</td><td>" + destinationCity + "</td><td>" +
          timedFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>"));
  });

/*  function(error) {
      console.log("The read failed: " + error.code);
  };*/