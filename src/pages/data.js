// import React,{useState,useEffect} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory,useParams, Link,Redirect} from 'react-router-dom';
// import Navbar from "../compenents/navbar";

// //import boostrap
// import {Form} from 'react-bootstrap';

// function Data (){
//     return(
//         <div>
//             <Navbar />
//             <div className='container'>
//                 <div className="header">
//                     <h1>Data "nama user"</h1>
//                 </div>
//                 <br />
//                 <Form>
//                     <div className="d-flex flex-column">
//                         <div className='huruf'>
//                             <div className="d-flex justify-content-between">
//                                 <div className="p-2 col-example text-left">
//                                     <div className="d-flex flex-column">

//                                         {/* nama lengkap */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Nama Lengkap:</label><br />
//                                             <label>Mark Lee</label>
//                                         </div>

//                                         {/* Alamat  */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Alamat Rumah :</label><br />
//                                             <label>Jalan xxx</label>
//                                         </div>

//                                         {/* no telepon */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>No Telepon :</label><br />
//                                             <label>08xxx</label>
//                                         </div>

//                                         {/* jenis kelamin */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Jenis Kelamin :</label><br />
//                                             <label>Laki-Laki</label>
//                                         </div>

//                                         {/* total hari */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Total Hari :</label><br />
//                                             <label>25</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="p-2 col-example text-left">
//                                     <div className="d-flex flex-column">
//                                         {/* golongan darah */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Golongan Darah :</label><br />
//                                             <label>B</label>
//                                         </div>
//                                         {/* jenis penyakit */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Jenis Penyakit :</label><br />
//                                             <label>Radang</label>
//                                         </div>
//                                         {/* jenis kamar */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Jenis Kamar :</label><br />
//                                             <label>VVIP</label>
//                                         </div>
//                                         {/* jenis biaya */}
//                                         <div className="p-2 col-example text-left">
//                                             <label>Jenis Biaya :</label><br />
//                                             <label>25</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="p-2 col-example text-left">
//                                     <Link to={`/u_data`} className="btn btn-primary">Edit data anda</Link>
//                                 </div>
//                             </div>
//                             <label>Cek biaya sampai saat ini :</label>
//                             <div className="d-inline-flex p-2 col-example">
//                                 <Link to={`/rincian`} className="btn btn-primary">Cek Rincian Biaya</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             </div>
//         </div>
//     );
// }
// export default Data;
