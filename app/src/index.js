import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/Indent.json";
import IPFS from "ipfs";
import $ from "jquery";
const IPFS1 = require('ipfs-api');
const ipfs = new IPFS1({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const App = {
  web3: null,
  account: null,
  meta: null,
  buffer: null,
  IPhash: null,
  tempaddress:null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
	    console.log(accounts);
      this.account = accounts[0];
      //App.onlyOwner();
      App.getData();
      App.pendingapproal();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
  // onlyOwner: async function() {
  //   const { addVerifire } = this.meta.methods;
  //   await addVerifire('0x50B74d89944eBA8a2e4e49C37bcEDff41126B667').send({from: this.account});
  //   console.log('UserAdded');
  // },
  getData: async function(){
  	const { getData } = this.meta.methods;
  	var data = await getData().call({ from: this.account });
  	console.log(data);
  	if(data[0]!=""){
  		document.getElementById('display').style.display="block";
  		document.getElementById('name').innerHTML= data[0];
  		document.getElementById('dob').innerHTML= data[1];
  		document.getElementById('gender').innerHTML= data[2];
  		if(data[3]!=""){
  			App.getAddhardata(this.account);
  		}else{
  		document.getElementById('addhardetails').innerHTML+= "<button onclick='App.addAdhar()' id='btnaddhar'>Add Addhar</button>";
  		}
  		if(data[4]!=""){
        App.getPanData(this.account);
  				}else{
  					document.getElementById('pandetails').innerHTML+= "<button onclick='App.addPan()' id='btnpan'>Add Pan-Card</button>";
  				}
  		if(data[5]!=""){
        App.getvoterData(this.account);
  				}else{
  					document.getElementById('voterdetails').innerHTML+= "<button onclick='App.addVoter()' id='btnvoter'>Add Voter</button>";
  				}
  		document.getElementById('reg').style.display="none";
  	}
  },

  addData: async function() {
    var name = document.getElementById("Name").value;
    var DOB = document.getElementById("DOB").value;
    var Gender = document.getElementById("Gender").value;

    const { signup } = this.meta.methods;
    await signup(name,DOB,Gender).send({ from: this.account }).then(()=>{App.setStatus('success')});
    this.getData();
  },

  capturefile: async function(event){
    const file = event.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      this.buffer = Buffer(reader.result);
      var file = await ipfs.files.add(this.buffer);
      this.IPhash = file[0].hash;
      console.log('buffer', file[0]);
    }
  },


  adharsubmit: async function(){
  	const{ addAddhar } = this.meta.methods;
  	var name=document.getElementById('aname').value;
  	var dob=document.getElementById('adob').value;
  	var gender=document.getElementById('asgender');
  	var selectedgender = gender.options[gender.selectedIndex].value;
  	var address=document.getElementById('Address').value;
  	var anumber=document.getElementById('Addharnumber').value;
  	await addAddhar(name,dob,selectedgender,this.IPhash,address,anumber).send({from: this.account});
  },

  getAddhardata: async function(address){
  	const { getaddharData } = this.meta.methods;
  	var data = await getaddharData(address).call({from: this.account});
  	console.log(data);
  	$('td#addharname').html('Name:'+data[0]);
  	$('td#addhardob').html('DOB:'+data[1]);
  	$('td#addhargen').html('Gender:'+data[2]);
  	$('td#addharaddress').html('Address:'+data[3]);
  	$('td#addharimage').html('<img src="https://ipfs.infura.io/ipfs/'+data[4]+'" width="30%"/>');
  	if(data[5]!=true){
  		$('td#addharbool').html('Verified: '+'<i class="fas fa-times-circle"></i><button onclick="App.getverify()">Get It Verified</button>');
  	}else{
  		$('td#addharbool').html('Verified: '+'<i class="fas fa-check-circle"></i>');
  	}
    $('div#displayadd').show();
  },

  addAdhar: function(){
  	document.getElementById('addAddhar').style.display="block";
  	document.getElementById('btnaddhar').style.display="none";
  },

  getPanData: async function(address){
  	const { getPanData } = this.meta.methods;
  	var data = await getPanData(address).call({from: this.account});
  	console.log(data);
  	$('td#panname').html('Name:'+data[0]);
  	$('td#panfname').html('DOB:'+data[1]);
  	$('td#pandob').html('Gender:'+data[2]);
  	$('td#panimage').html('<img src="https://ipfs.infura.io/ipfs/'+data[3]+'" width="30%"/>');
  	if(data[4]!=true){
  		$('td#panbool').html('Verified: '+'<i class="fas fa-times-circle"></i><button onclick="App.getverify()">Get It Verified</button>');
  	}else{
  		$('td#panbool').html('Verified: '+'<i class="fas fa-check-circle"></i>');
  	}
    $('div#pandisplayadd').show();
  },
  pansubmit: async function(){
  	const{ addPan } = this.meta.methods;
  	var name=document.getElementById('pname').value;
    var fname=document.getElementById('pfname').value;
  	var dob=document.getElementById('pdob').value;
  	var pnumber=document.getElementById('pnumber').value;
  	await addPan(name,fname,dob,this.IPhash,pnumber).send({from: this.account});
  },
  addPan: function(){
  	$('div#addPan').show();
  	document.getElementById('btnpan').style.display="none";
  },


  getvoterData: async function(address){
  	const { getVoterData } = this.meta.methods;
  	var data = await getVoterData(address).call({from: this.account});
  	console.log(data);
  	$('td#votername').html('Name:'+data[0]);
  	$('td#voterfname').html('Fname:'+data[1]);
  	$('td#votergender').html('Gender:'+data[2]);
    $('td#voterdob').html('DOB:'+data[3]);
    $('td#voteraddress').html('Address:'+data[4])
  	$('td#voterimage').html('<img src="https://ipfs.infura.io/ipfs/'+data[5]+'" width="30%"/>');
  	if(data[6]!=true){
  		$('td#voterbool').html('Verified: '+'<i class="fas fa-times-circle"></i><button onclick="App.getverify()">Get It Verified</button>');
  	}else{
  		$('td#voterbool').html('Verified: '+'<i class="fas fa-check-circle"></i>');
  	}
    $('div#voterdisplayadd').show();
  },
  votersubmit: async function(){
  	const{ addVoter } = this.meta.methods;
  	var ename=document.getElementById('ename').value;
    var efname=document.getElementById('efname').value;
  	var edob=document.getElementById('edob').value;
  	var enumber=document.getElementById('enumber').value;
    var eaddress = document.getElementById('eaddress').value;
    var gender=document.getElementById('esgender');
  	var selectedgender = gender.options[gender.selectedIndex].value;
  	await addVoter(ename,efname,selectedgender,edob,eaddress,this.IPhash,enumber).send({from: this.account});
  },
  addVoter: function(){
  	$('div#addVoter').show();
  	document.getElementById('btnvoter').style.display="none";
  },


  search: async function(){
    const { search } = this.meta.methods;
    var address = $('input#searchid').val();
    this.tempaddress=address;
    var data = await search(address).call({from: this.account});
    console.log(data);
    var data1 = data[1];
    var data2 = data[2];
    if(data[0]==true){
      const { getaddharData } = this.meta.methods;
    	var data = await getaddharData(address).call({from: this.account});
    	console.log(data);
    	$('td#saddharname').html('Name:'+data[0]);
    	$('td#saddhardob').html('DOB:'+data[1]);
    	$('td#saddhargen').html('Gender:'+data[2]);
    	$('td#saddharaddress').html('Address:'+data[3]);
    	$('td#saddharimage').html('<img src="https://ipfs.infura.io/ipfs/'+data[4]+'" width="30%"/>');
    	if(data[5]!=true){
    		$('td#saddharbool').html('Verified: '+'<i class="fas fa-times-circle"></i>');
    	}else{
    		$('td#saddharbool').html('Verified: '+'<i class="fas fa-check-circle"></i>');
    	}
      $('#searchaddhardetails').show();
    }else{
      $('#searchaddhardetails').show();
      $('#searchaddhardetails').html('<button onClick="App.requestAddhar()">Request Addhar</button>');
    }

    if(data1==true){
      const { getPanData } = this.meta.methods;
    	var data = await getPanData(address).call({from: this.account});
    	console.log(data);
    	$('td#spanname').html('Name:'+data[0]);
    	$('td#spanfname').html('DOB:'+data[1]);
    	$('td#spandob').html('Gender:'+data[2]);
    	$('td#spanimage').html('<img src="https://ipfs.infura.io/ipfs/'+data[3]+'" width="30%"/>');
    	if(data[4]!=true){
    		$('td#spanbool').html('Verified: '+'<i class="fas fa-times-circle"></i>');
    	}else{
    		$('td#spanbool').html('Verified: '+'<i class="fas fa-check-circle"></i>');
    	}
      $('#searchpandetails').show();
    }else{
      $('#searchpandetails').show();
      $('#searchpandetails').html('<button onClick="App.requestPan()">Request Pan</button>');
    }

    if(data2==true){
      const { getVoterData } = this.meta.methods;
    	var data = await getVoterData(address).call({from: this.account});
    	console.log(data);
    	$('td#svotername').html('Name:'+data[0]);
    	$('td#svoterfname').html('Fname:'+data[1]);
    	$('td#svotergender').html('Gender:'+data[2]);
      $('td#svoterdob').html('DOB:'+data[3]);
      $('td#svoteraddress').html('Address:'+data[4])
    	$('td#svoterimage').html('<img src="https://ipfs.infura.io/ipfs/'+data[5]+'" width="30%"/>');
    	if(data[6]!=true){
    		$('td#svoterbool').html('Verified: '+'<i class="fas fa-times-circle"></i>');
    	}else{
    		$('td#svoterbool').html('Verified: '+'<i class="fas fa-check-circle"></i>');
    	}
      $('div#searchvoterdetails').show();
    }else{
      $('#searchvoterdetails').show();
      $('#searchvoterdetails').html('<button onClick="App.requestVoter()">Request Voter</button>');
    }
    console.log(data);
  },
  requestAddhar: async function (address){
    const { req_addhar } = this.meta.methods;
    await req_addhar(this.tempaddress).send({from: this.account});
  },
  requestPan: async function (address){
    const { req_pan } = this.meta.methods;
    await req_pan(this.tempaddress).send({from: this.account});
  },
  requestVoter: async function (address){
    const { req_voter } = this.meta.methods;
    await req_voter(this.tempaddress).send({from: this.account});
  },
  approaladdhar: async function(address){
      const { allow_Add } = this.meta.methods;
      await allow_Add(address).send({from: this.account});
  },
  approalpan: async function(address){
      const { allow_pan } = this.meta.methods;
      await allow_pan(address).send({from: this.account});
  },
  approalvoter: async function(address){
      const { allow_voter } = this.meta.methods;
      await allow_voter(address).send({from: this.account});
  },
  pendingapproal: async function(){
    const {getRequet_getAllowed_Queue} = this.meta.methods;
    const { getDataname } = this.meta.methods;
    var data = await getRequet_getAllowed_Queue().call({from: this.account});

    var raddhar = '';
    let arr = data[0];
    console.log(data);
    arr = arr.filter(e => e !== '0x0000000000000000000000000000000000000000');
    for(var i=1;i<arr.length;i++){
    	var data1 = await getDataname(data[0][i]).call({from: this.account});
      raddhar += "<tr><td>"+data1+"<button onClick=App.approaladdhar('"+data[0][i]+"')>Allow</buton></td></tr>";
    }
    $('table#arequest').html(raddhar);

    var roaddhar = '';
    data[1] = data[1].filter(e => e !== '0x0000000000000000000000000000000000000000');
    for(var i=1;i<data[1].length;i++){
    	var data1 = await getDataname(data[1][i]).call({from: this.account});
      roaddhar += "<tr><td>"+data1+"</td></tr>";
    }
    $('table#aallowed').html(roaddhar);

    var rpan = '';
    data[2] = data[2].filter(e => e !== '0x0000000000000000000000000000000000000000');
    for(var i=1;i<data[2].length;i++){
    	var data1 = await getDataname(data[2][i]).call({from: this.account});
      rpan += "<tr><td>"+data1+"<button onClick=App.approalpan('"+data[2][i]+"')>Allow</buton></td></tr>";
    }
    $('table#prequest').html(rpan);

    var ropan = '';
    data[3] = data[3].filter(e => e !== '0x0000000000000000000000000000000000000000');
    for(var i=1;i<data[3].length;i++){
    	var data1 = await getDataname(data[3][i]).call({from: this.account});
      ropan += "<tr><td>"+data1+"</td></tr>";
    }
    $('table#pallowed').html(ropan);

    var rvoter = '';
    data[4] = data[4].filter(e => e !== '0x0000000000000000000000000000000000000000');
    for(var i=1;i<data[4].length;i++){
    	var data1 = await getDataname(data[4][i]).call({from: this.account});
      rvoter += "<tr><td>"+data1+"<button onClick=App.approalvoter('"+data[4][i]+"')>Allow</buton></td></tr>";
    }
    $('table#vrequest').html(rvoter);

    var rovoter = '';
    data[5] = data[5].filter(e => e !== '0x0000000000000000000000000000000000000000');
    for(var i=1;i<data[5].length;i++){
    	var data1 = await getDataname(data[5][i]).call({from: this.account});
      rovoter += "<tr><td>"+data1+"</td></tr>";
    }
    $('table#vallowed').html(rovoter);
  },
  setStatus: function(message) {
    Swal.fire(
  	  'Good job!',
  	  'You Have successfully Registered',
  	  'success'
  	)
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }
  App.start();
});
