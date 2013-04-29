$(document).ready(function(){
    function show_waiting(){
		$('#waiting_background').css({"visibility":"visible"});
		$('#yoyo').css({"visibility":"visible"});
	}
	function hide_waiting(){
			$('#waiting_background').css({"visibility":"hidden"});
			$('#yoyo').css({"visibility":"hidden"});
	}
	var play_token_is;
		var getTracksUrl;
	$("#srchBar").focus();
	function findTheMix(){
	show_waiting();
	$('#srchResults').empty();
	$.getJSON('http://8tracks.com/mixes.json',
		{
		api_key:'8c65f1da78d13e2e273d2f2f2c579af0c55ff851' ,
		q:document.getElementById('srchBar').value,
		
		},
		function (data){
		$('#srchResults').append("<br>RETURN MIXES: "+data.mixes.length+"<br>");
		for(i=0;i<data.mixes.length;i++){
			$('#srchResults').append("<a href='#' id='"+data.mixes[i].id+"' >"+data.mixes[i].name+"</a> "+data.mixes[i].id+" "+data.mixes[i].description+"<br><img src='"+data.mixes[i].cover_urls.sq56+"'><br>");
		}
		
		}).done(function(){hide_waiting();find_tracks_of_the_mix();});
		
		
	}
	$('#srchForm').submit(function(){
		
		findTheMix();return false;
	});
	$('#srchBtn').click(function(){	
		
	});
	$('#srchTrckForm').submit(function(){
		
		show_waiting();
		$('#returnedTracks').empty();
		var track_id_is_this=document.getElementById('srchTrckBar').value;
		$.getJSON('https://8tracks.com/sets/new.json',
		{
		api_key:'8c65f1da78d13e2e273d2f2f2c579af0c55ff851'
		},
		function (data2,getTracksUrl){
			play_token_is=data2.play_token;
			getTracksUrl="http://8tracks.com/sets/"+play_token_is+"/play.json";
			//alert(play_token_is+" "+getTracksUrl);
			$.getJSON("http://8tracks.com/sets/"+data2.play_token+"/play.json",
		{
		mix_id:track_id_is_this,
		api_key:"8c65f1da78d13e2e273d2f2f2c579af0c55ff851",
		},
		function (data3){
			$('#returnedTracks').append("<a href='"+data3.set.track.url+"' target='_blank' >"+data3.set.track.name+"</a> by "+data3.set.track.performer+" in "+data3.set.track.release_name+"<br>");
			//$('#returnedTracks').append("<div id='more_tracks'>false</div>");
			{
				var more_is_there=true;
				//var is_more_there=document.getElementById('more_tracks').value;
			//	alert(is_more_there);
			i=0;k="false";
			doin_something(data2.play_token,track_id_is_this,"8c65f1da78d13e2e273d2f2f2c579af0c55ff851",data3.set.track.name);
				
			
			}
		});
		}).done(function(){hide_waiting();});
		
		
		return false;
	});
	function doin_something(i_play_token,i_mix_id,i_api_key,i_last_track){
		
			$.getJSON("http://8tracks.com/sets/"+i_play_token+"/next.json",
			{
				mix_id:i_mix_id,
				api_key:i_api_key,
			},function(_data){
				$('#returnedTracks').append("<a href='"+_data.set.track.url+"' target='_blank' >"+_data.set.track.name+"</a> by "+_data.set.track.performer+" in "+_data.set.track.release_name+"<br>");
				if(!_data.set.at_last_track && i_last_track!=_data.set.track.name )	doin_something(i_play_token,i_mix_id,i_api_key,_data.set.track.name);
			});
	
	}
	function find_tracks_of_the_mix(){
	$('.tracks_download').click(function(){alert(this.id);console.log("harka");});
	}
	
});