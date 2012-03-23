<?php

$conn = @new mysqli('localhost', 'root', 'root', 'uitinvlaanderen');

if (!$conn -> connect_error) {
	
	$qry = "SELECT eId,eName, lName, eImage, eDateStart, cColor
			FROM tblEvenement
			INNER JOIN tblLocatie ON ( tblEvenement.lId = tblLocatie.lId )
			INNER JOIN tblCategory ON ( tblEvenement.eCategory = tblCategory.cId )";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array(
				"getItem" => true, 
				"evId" => $singleResult['eId'], 
				"evColor" => $singleResult['cColor'], 
				"evNaam" => $singleResult['eName'], 
				"evDate" => $singleResult['eDateStart'],
				"evLocatie" => $singleResult['lName'], 
				"evImage" => $singleResult['eImage']);
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