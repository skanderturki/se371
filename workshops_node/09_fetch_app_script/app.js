const url = "https://script.google.com/macros/s/AKfycbxCHHMbkEwYq2VLtpckUUL1jEClKR4Ca5COY5iSJX-5GDMAvNdpQNtCKNPXu90S2js0/exec";

const check = async () => {

  // Create new user
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({email: 'sk@ska.com'}),
      headers: {'Content-Type': 'application/json'}
  });

  const json = await response.json();
  return json;
};

check().then(data => { 
  console.log(data);
  //console.log(data.userdata[1][0]);
  //console.log(data.userdata[1][1]);
});
