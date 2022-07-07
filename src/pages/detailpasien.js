// import React,{useState,useEffect} from 'react';
// import axios from 'axios';
// import {useHistory,useParams, Link} from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';


// function DetailPasien() {
//     const [Nama_pasienn,setNama_pasienn] = useState('');
//     const [alamat,setAlamat] = useState('');
//     const [penyakit,setPenyakit] = useState([]);
//     const [tanggal_daftar,setTanggal_Daftar] = useState('');
//     const [jenis_kelamin,setJenis_kelamin] = useState('');
//     const [kamar,setKamar] = useState([])
//     const [biaya,setBiaya] = useState([])
//     const history = useHistory();
//     const {Id} = useParams();

//     const autorization = () => {
//         axios.get(`http://localhost:3000/authenticated`,{
//             headers: {
//                 "x-access-token": localStorage.getItem('token')
//             }})
//         .then(res => {
//             console.log(res.data.auth);
//             if(res.data.auth === false){
//                 history.push('/');
//             }
//         })
//         .catch(err => {
//             console.log(err.response.message);
//         })
//     }

//     const getData = () => {
//         axios.get(`http://localhost:3000/pasien/${Id}`)
//         .then(res => {
//             setNama_pasienn(res.data.nama);
//             setAlamat(res.data.alamat);
//             setTanggal_Daftar(res.data.tanggal_daftar);
//             setJenis_kelamin(res.data.jenis_kelamin);
//             console.log(res.data);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
    
//     useEffect(() => {
//         autorization();
//         getData();
//     })

//     const pdfDownload = () => {
//         var doc = new jsPDF();
//         doc.text('Detail Pasien', 10, 10);
//         doc.text('Nama Pasien : '+Nama_pasienn, 10, 20);
//         doc.text('Alamat : '+alamat, 10, 30);
//         doc.text('Tanggal Daftar : '+tanggal_daftar, 10, 40);
//         doc.text('Jenis Kelamin : '+jenis_kelamin, 10, 50);
//         doc.text('Penyakit : '+penyakit, 10, 60);
//         doc.text('Kamar : '+kamar, 10, 70);
//         doc.text('Biaya : '+biaya, 10, 80);
//         doc.save('table.pdf');
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="card-header">
//                             <h3 className="card-title">Detail Pasien</h3>
//                         </div>
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="form-group">
//                                         <label>Nama Pasien</label>
//                                         <input type="text" className="form-control" value={Nama_pasienn} readOnly/>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Alamat</label>
//                                         <input type="text" className="form-control" value={alamat} readOnly/>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Tanggal Lahir</label>
//                                         <input type="text" className="form-control" value={tanggal_daftar} readOnly/>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Jenis Kelamin</label>
//                                         <input type="text" className="form-control" value={jenis_kelamin} readOnly/>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group">
//                                         <label>Penyakit</label>
//                                         <input type="text" className="form-control" value={penyakit} readOnly/>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Kamar</label>
//                                         <input type="text" className="form-control" value={kamar} readOnly/>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Biaya</label>
//                                         <input type="text" className="form-control" value={biaya} readOnly/>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-12">
//                                     <div className="form-group">
//                                         <button className="btn btn-primary" onClick={pdfDownload}>Download PDF</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DetailPasien;

     