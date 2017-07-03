<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/png" href="icon.png" />
  <title>Fuel Price in India</title>

  <style>
    body {
      min-width: 300px;
      min-height: 400px;
    }

    #loader,
    #main {
      display: flex;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      font-family: Helvetica, 'Helvetica Neue', sans-serif;
      letter-spacing: 1px;
      font-weight: bold;
      font-size: 2em;
      color: #a0a0a0;
    }

    #main {
      flex-direction: column;
    }

    #body,
    #notAvailable {
      display: none;
    }

    .heading {
      position: fixed;
      top: 0;
      width: 100%;
      margin: 0;
      text-align: center;
      padding: 15px;
      border: solid 1px black;
      background: rebeccapurple;
      color: white;
    }

    #city {
      font-size: 2em;
      padding: 10px;
      color: blueviolet;
    }

    .price {
      color: #19586d;
    }

    #petrol-price {
      font-size: 1.3em;
    }

    #change {
      font-size: 0.7em;
      margin-top: 3px;
    }

    .increased {
      color: red;
    }

    .decreased {
      color: green;
    }

    #notAvailable {
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;
      text-align: center;
    }

    #body {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .sadFace {
      font-size: 3em;
      margin-bottom: .1em;
    }
  </style>
</head>

<body>
  <div id="main">
    <div class="heading">Daily Petrol Price</div>
    <div id="body">
      <div id="city"></div>
      <div class="price">&#8377; <span id="petrol-price"></span></div>
      <div id="change" title="Change since last update"></div>
    </div>
    <div id="notAvailable">
      <div class="sadFace">&#9785;</div>
      <div>Sorry, this service is not available for your city.</div>
    </div>
  </div>
  <div id="loader">
    <img src="loading.gif" alt="Please wait..." />
  </div>

  <script src="main.js"></script>
</body>

</html>
