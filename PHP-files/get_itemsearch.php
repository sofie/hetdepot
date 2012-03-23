<?php

$conn = @new mysqli('localhost', 'root', 'root', 'uitinvlaanderen');

if (!$conn -> connect_error) {
	
	$eName = $_POST['eName'];
	
	$qry = "SELECT eId, eName, eImage, eDescription, eDateStart, eStartHour, ePrice FROM tblEvenement WHERE eName LIKE '%".$eName."%'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();

		while ($singleResult = mysqli_fetch_assoc($result)) {

			$response = array(
				"searchItem" => true, 
				"evId" => $singleResult['eId'], 
				"evNaam" => $singleResult['eName'], 
				"evImage" => $singleResult['eImage'], 
				"evDescription" => $singleResult['eDescription'],
				"evDate" => $singleResult['eDateStart'],
				"evHour" => $singleResult['eStartHour'],
				"evPrice" => $singleResult['ePrice'],
				"qry"=> $qry
			);
			$list[] = $response;
		};
		
		echo json_encode($list);
	} else {
		$response = array("searchItem" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  