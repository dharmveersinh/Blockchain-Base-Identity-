pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

contract Indent{

    address owner;
    address[] verifire;

    constructor() public{
        owner = msg.sender;
    }

   struct verify{
        address user;
        string number;
        uint typee;

    }

    struct addhar{
        address[] req_addhar;
        address[] allowed_addhar;
        string name;
        string dob;
        string addresss;
        string gender;
        string AIPHASH;
        bool verified;
    }

    struct voter{
        address[] req_voter;
        address[] allowed_voter;
        string name;
        string fname;
        string gender;
        string dob;
        string addresss;
        string VIPHASH;
        bool verified;
    }

    struct pan{
        address[] req_pan;
        address[] allowed_pan;
        string name;
        string fname;
        string dob;
        string PIPHASH;
        bool verified;
    }

    struct main{
        string name;
        string dob;
        string gender;
        string addharnumber_main;
        string pannumber_main;
        string EPICnumber_main;
        address data_owner_address;
        mapping (string => addhar) addharnumer;
        mapping (string => voter) EPICnumber;
        mapping (string => pan) PANnumber;
    }

    mapping (address => main) mainindex;
    mapping (address=>verify) verifyindex;

    function signup(string memory name, string memory dob, string memory gender) public {
        mainindex[msg.sender] = main(name,dob,gender,'','','',msg.sender);
    }

    function addAddhar(string memory name, string memory dob, string memory gender, string memory IPHASH, string memory addres, string memory adharnumber) public{
        main storage m1 = mainindex[msg.sender];
        m1.addharnumber_main = adharnumber;
        m1.addharnumer[adharnumber].req_addhar.push(msg.sender);
        m1.addharnumer[adharnumber].allowed_addhar.push(msg.sender);
        m1.addharnumer[adharnumber].name = name;
        m1.addharnumer[adharnumber].dob = dob;
        m1.addharnumer[adharnumber].addresss = addres;
        m1.addharnumer[adharnumber].gender = gender;
        m1.addharnumer[adharnumber].AIPHASH = IPHASH;
        m1.addharnumer[adharnumber].verified = false;
     //address[] memory s1;
     //s1[0] = msg.sender;
     //m1.addharnumer[adharnumber] = addhar(s1,s1,name,dob,addres,gender,IPHASH,false);
    }

    function addVoter(string memory name, string memory fname, string memory gender,string memory dob, string memory addres, string memory VIPHASH, string memory EPICnumber) public{
        main storage m1 = mainindex[msg.sender];
        m1.EPICnumber_main = EPICnumber;
        m1.EPICnumber[EPICnumber].req_voter.push(msg.sender);
        m1.EPICnumber[EPICnumber].allowed_voter.push(msg.sender);
        m1.EPICnumber[EPICnumber].name = name;
        m1.EPICnumber[EPICnumber].fname = fname;
        m1.EPICnumber[EPICnumber].gender = gender;
        m1.EPICnumber[EPICnumber].dob = dob;
        m1.EPICnumber[EPICnumber].addresss = addres;
        m1.EPICnumber[EPICnumber].VIPHASH = VIPHASH;
        m1.EPICnumber[EPICnumber].verified = false;
        //address[] memory s1;
        //s1[0] = msg.sender;
        //m1.EPICnumber[EPICnumber] = voter(s1,s1,name,fname,gender,dob,addres,VIPHASH,false);

    }
    function addPan(string memory name, string memory fname,string memory dob, string memory PIPHASH, string memory PANnumber) public{
        main storage m1 = mainindex[msg.sender];
        m1.pannumber_main = PANnumber;
        m1.PANnumber[PANnumber].req_pan.push(msg.sender);
        m1.PANnumber[PANnumber].allowed_pan.push(msg.sender);
        m1.PANnumber[PANnumber].name = name;
        m1.PANnumber[PANnumber].fname = fname;
        m1.PANnumber[PANnumber].dob = dob;
        m1.PANnumber[PANnumber].PIPHASH = PIPHASH;
        m1.PANnumber[PANnumber].verified = false;
        //address[] memory s1;
        //s1[0] = msg.sender;
        //m1.PANnumber[PANnumber] = pan(s1,s1,name,fname,dob,PIPHASH,false);
    }

     function getData() public returns (string memory,string memory,string memory,string memory,string memory,string memory){
        main storage m1 = mainindex[msg.sender];
        return (m1.name,m1.dob,m1.gender,m1.addharnumber_main,m1.pannumber_main,m1.EPICnumber_main);
    }

    function getDataname(address req) public returns (string memory){
       main storage m1 = mainindex[req];
       return (m1.name);
   }

function getaddharData(address user_add1) public returns (string memory,string memory,string memory,string memory,string memory,bool){
        main storage m1 = mainindex[user_add1];
        addhar storage a1 = m1.addharnumer[m1.addharnumber_main];
        for(uint i=0;i<m1.addharnumer[m1.addharnumber_main].allowed_addhar.length;i++){
            if(msg.sender==m1.addharnumer[m1.addharnumber_main].allowed_addhar[i]){
                return (a1.name,a1.dob,a1.gender,a1.addresss,a1.AIPHASH,a1.verified);
            }
        }
    }

    function getPanData(address user_add1) public returns (string memory,string memory,string memory,string memory,bool){
        main storage m1 = mainindex[user_add1];
        pan storage p1 = m1.PANnumber[m1.pannumber_main];
        for(uint i=0;i<m1.PANnumber[m1.pannumber_main].allowed_pan.length;i++){
            if(msg.sender==m1.PANnumber[m1.pannumber_main].allowed_pan[i]){
                return (p1.name,p1.fname,p1.dob,p1.PIPHASH,p1.verified);
            }
        }
    }

    function getVoterData(address user_add1) public returns (string memory,string memory,string memory,string memory,string memory,string memory,bool){
        main storage m1 = mainindex[user_add1];
        voter storage e1 = m1.EPICnumber[m1.EPICnumber_main];
        for(uint i=0;i<m1.EPICnumber[m1.EPICnumber_main].allowed_voter.length;i++){
            if(msg.sender==m1.EPICnumber[m1.EPICnumber_main].allowed_voter[i]){
                return (e1.name,e1.fname,e1.gender,e1.dob,e1.addresss,e1.VIPHASH,e1.verified);
            }
        }

    }


//get data of documents for owner only
//
    function getRequet_getAllowed_Queue() public returns(address[] memory, address[] memory, address[] memory, address[] memory, address[] memory, address[] memory){
        main storage m1 = mainindex[msg.sender];
        string memory addhar_num = m1.addharnumber_main;
        string memory pan_num = m1.pannumber_main;
        string memory voter_num = m1.EPICnumber_main;
        return (m1.addharnumer[addhar_num].req_addhar,m1.addharnumer[addhar_num].allowed_addhar,m1.EPICnumber[voter_num].req_voter,m1.EPICnumber[voter_num].allowed_voter,m1.PANnumber[pan_num].req_pan,m1.PANnumber[pan_num].allowed_pan);
    }

//request function for various documents
    function req_addhar(address user_address) public{
        main storage m1 = mainindex[user_address];
        //string memory add = m1.addharnumber_main;
        m1.addharnumer[m1.addharnumber_main].req_addhar.push(msg.sender);
    }

    function req_pan(address user_address) public{
        main storage m1 = mainindex[user_address];
        //string memory add = m1.pannumber_main;
        m1.PANnumber[m1.pannumber_main].req_pan.push(msg.sender);
    }

    function req_voter(address user_address) public{
        main storage m1 = mainindex[user_address];
        //string memory add = m1.pannumber_main;
        m1.EPICnumber[m1.EPICnumber_main].req_voter.push(msg.sender);
    }

//return data of documents if allowed
    function allow_Add(address req_add) public onlyDataOwner{
        main storage m1 = mainindex[msg.sender];
        //string memory add = m1.addharnumber_main;
        uint index = 0;
        for(uint i=0;i<m1.addharnumer[m1.addharnumber_main].req_addhar.length;i++){
            if(req_add==m1.addharnumer[m1.addharnumber_main].req_addhar[i]){
                index = i;
                break;
            }
        }
        delete m1.addharnumer[m1.addharnumber_main].req_addhar[index];
        m1.addharnumer[m1.addharnumber_main].allowed_addhar.push(req_add);
    }

    function allow_pan(address req_add) public onlyDataOwner{
        main storage m1 = mainindex[msg.sender];
        //string memory add = m1.pannumber_main;
        uint index = 0;
        for(uint i=0;i<m1.PANnumber[m1.pannumber_main].req_pan.length;i++){
            if(req_add==m1.PANnumber[m1.pannumber_main].req_pan[i]){
                index = i;
                break;
            }
        }
        delete m1.PANnumber[m1.pannumber_main].req_pan[index];
        m1.PANnumber[m1.pannumber_main].allowed_pan.push(req_add);
        //return m1.addharnumer[add].allowed_addhar;
    }

    function allow_voter(address req_add) public onlyDataOwner{
        main storage m1 = mainindex[msg.sender];
        //string memory add = m1.EPICnumber_main;
        uint index = 0;
        for(uint i=0;i<m1.EPICnumber[m1.EPICnumber_main].req_voter.length;i++){
            if(req_add==m1.EPICnumber[m1.EPICnumber_main].req_voter[i]){
                index = i;
                break;
            }
        }
        delete m1.EPICnumber[m1.EPICnumber_main].req_voter[index];
        m1.EPICnumber[m1.EPICnumber_main].allowed_voter.push(req_add);
        //return m1.addharnumer[add].allowed_addhar;
    }

//Add trusted verifires
    function addVerifire(address verifire_address) public onlyOwner{
        verifire.push(verifire_address);
    }

//request verification
    function requestVerification(string memory number1,uint typeee) public{
        verifyindex[msg.sender] = verify(msg.sender,number1,typeee);
    }


    function getVerificationRequest() public onlyVerifire returns(address,string memory,uint){
        verify storage v1 = verifyindex[msg.sender];
        return (v1.user,v1.number,v1.typee);
    }

//seratch if allowed return data else request
    function search(address user_add) public returns(bool,bool,bool){
        main storage m1 = mainindex[user_add];
        //string memory addhar1 = m1.addharnumber_main;
        //string memory pan1 = m1.pannumber_main;
        //string memory epic1 = m1.EPICnumber_main;
        bool allow_addhar1 = false;
        bool allow_pan1 = false;
        bool allow_voter1 = false;
        for(uint i=0;i<m1.addharnumer[m1.addharnumber_main].allowed_addhar.length;i++){
             if(msg.sender==m1.addharnumer[m1.addharnumber_main].allowed_addhar[i]||msg.sender==m1.data_owner_address){
                 allow_addhar1 = true;
                 break;
             }
        }
        for(uint i=0;i<m1.PANnumber[m1.pannumber_main].allowed_pan.length;i++){
            if(msg.sender==m1.PANnumber[m1.pannumber_main].allowed_pan[i]){
                allow_pan1 = true;
            }
        }
        for(uint i=0;i<m1.EPICnumber[m1.EPICnumber_main].allowed_voter.length;i++){
            if(msg.sender==m1.EPICnumber[m1.EPICnumber_main].allowed_voter[i]){
                allow_voter1 = true;
            }
        }
        return (allow_addhar1,allow_pan1,allow_voter1);
    }
//verify the data
    function verifyData(address user_add, uint doc_type)public onlyVerifire{
    /* 1. Addhar
        2. Pan
        3. VoterID*/
        main storage m1 = mainindex[user_add];
        if(doc_type==1){
            //string memory addhar_id = m1.addharnumber_main;
            m1.addharnumer[m1.addharnumber_main].verified = true;
        }
        if(doc_type==2){
            //string memory pan_id = m1.pannumber_main;
            m1.PANnumber[m1.pannumber_main].verified = true;
        }
        if(doc_type==3){
            //string memory epic_id = m1.EPICnumber_main;
            m1.EPICnumber[m1.EPICnumber_main].verified = true;
        }
    }

//modifiers
    modifier onlyOwner(){
        if(owner==msg.sender) _;
    }

    modifier onlyVerifire(){
        bool allowed_verifire = false;
        for(uint i=0;i<verifire.length;i++){
            if(msg.sender==verifire[i]){
                allowed_verifire = true;
                break;
            }
        }
        if(allowed_verifire) _;
    }

    modifier onlyDataOwner(){
        main storage m1 = mainindex[msg.sender];
        if(msg.sender==m1.data_owner_address) _;
    }
}
