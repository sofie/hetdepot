<?php

$conn = @new mysqli('localhost', 'root', 'root', 'uitinvlaanderen');

if (!$conn -> connect_error) {
	
	$eId = $_POST['eId'] + 1;
	
	$qry = "SELECT eName, eImage, eDescription, eDateStart, eStartHour, ePrice
			FROM tblEvenement
			WHERE eId = '" .$eId. "'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {

			$response = array(
				"getItem" => true, 
				"evNaam" => $singleResult['eName'], 
				"evImage" => $singleResult['eImage'], 
				"evDescription" => $singleResult['eDescription'],
				"evDate" => $singleResult['eDateStart'],
				"evHour" => $singleResult['eStartHour'],
				"evPrice" => $singleResult['ePrice']
			);
	
		echo json_encode($response);

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