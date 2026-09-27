<?php
	require_once __DIR__ . '/config.php';

	$inData = getRequestInfo();

	// TODO: insert $inData["color"] into the Colors table for
	// $inData["userId"].
	returnWithError("Not implemented yet");

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
