<?php

$conn = @new mysqli('localhost', 'root', 'root', 'uitinvlaanderen');

if (!$conn -> connect_error) {
	
	$eDateStart = $_POST['eDateStart'];
	
	//$qry = "SELECT eId, eName, eImage, eDescription, eDateStart, eStartHour, ePrice FROM tblEvenement  WHERE eDateStart >= '".$eDateStart."' ORDER BY eDateStart";
	$qry = "SELECT eId, eName, eImage, eDescription, eDateStart, eStartHour, ePrice FROM tblEvenement  WHERE eDateStart >= '2012-03-30' ORDER BY eDateStart";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if (mysqli_num_rows($result) > 0) {
		$list = array();
		mysqli_data_seek($result,0);

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