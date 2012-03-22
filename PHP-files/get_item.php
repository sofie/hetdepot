<?php

$conn = @new mysqli('localhost', 'root', 'root', 'uitinvlaanderen');

if (!$conn -> connect_error) {
	
	$qry = "SELECT eName, lName, eImage
			FROM tblEvenement
			INNER JOIN tblLocatie ON ( tblEvenement.lId = tblLocatie.lId )";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getItem" => true, "evNaam" => $singleResult['eName'], "evLocatie" => $singleResult['lName'], "evImage" => $singleResult['eImage']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getItem" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  