<!DOCTYPE html>
<html>
<head>
	<title>Simulasi Pengisian Gudang</title>
	<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=0">
</head>
<link rel="stylesheet" type="text/css" href="css/standard.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/three.js"></script>
<script type="text/javascript" src="js/tweenjs041min.js"></script>
<script type="text/javascript" src="js/stats.min.js"></script>
<script type="text/javascript" src="js/simulasi.js"></script>
<body>
	<div id="menu">
		<div id="submenu"></div>
		<div id="submenu2">
			<div id="kotak">
				Jumlah Jenis Kotak : <input type='text' id='jlhjeniskotak' style='width:10px;' />
				<button id="btnJenisKotak" class="btn">Set</button>
			</div>
			<div id="deskkotak"></div>
			<button type="button" id="sim" class="btn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Run&nbsp;&nbsp;&nbsp;&nbsp;</button>
		</div>
	</div>
	<div id="tampung"></div>
</body>
</html>
