import React from 'react'
import { useLocation } from 'react-router-dom';


const Profile = () => {


    const location = useLocation();
    const { currentUser } = location.state || {};
    return (
        <div className='container'>
            <div className='border'>Profile
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td colspan="4" align="center">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img width={200} className='img-thumbnail' src='https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=' />
                                </div>
                                <h4>{currentUser.name}</h4>
                            </td>
                        </tr>

                        <tr>
                            <td>  Ref .Name </td>
                            <td> vijay </td>
                            <td> Name.  </td>
                            <td>  DURGESH  </td>
                        </tr>
                        <tr>
                            <td>  Frist .Name </td>
                            <td> DURGESH </td>
                            <td> Last Name.  </td>
                            <td>  CHAURASIYA </td>
                        </tr>
                        <tr>
                            <td>  User Name </td>
                            <td> DURGESH </td>
                            <td>  Mobile  </td>
                            <td>  955250582 </td>
                        </tr>
                        <tr>
                            <td> Aadhar No. </td>
                            <td> 471051181112 </td>
                            <td> Pan No. </td>
                            <td>  5869474910 </td>
                        </tr>
                        <tr>
                            <td> Email </td>
                            <td> MYTOTALHELPER@GAMIL.COM </td>
                            <td> Date Of Joining </td>
                            <td>  07/01/2023 </td>
                        </tr>
                        <tr>
                            <td> Permanent Address </td>
                            <td colspan="3"> ASHIYANA </td>

                        </tr>
                        <tr>
                            <td>Current Address </td>
                            <td colspan="3"> ASHIYANA </td>
                        </tr>
                        <tr>
                            <td colspan="4"> Refrence Details </td>
                        </tr>
                        <tr>
                            <td>  Ref .Name </td>
                            <td> vijay </td>
                            <td> Aadhaar No.  </td>
                            <td>  12742875682863 </td>
                        </tr>
                        <tr>
                            <td> Address </td>
                            <td colspan="3"> ASHIYANA </td>

                        </tr>
                        <tr>
                            <td> Mobile No. </td>
                            <td colspan="3"> 0000000000 </td>

                        </tr>
                        <tr>
                            <td>  City  </td>
                            <td> Lucknow </td>
                            <td> Area    </td>
                            <td>  ASHIYANA </td>
                        </tr>
                        <tr>
                            <td> Location Area  </td>
                            <td colspan="3"> Ashiyana, Lucknow, Uttar Pradesh, India </td>

                        </tr>
                        <tr>
                            <td> Services </td>
                            <td colspan="3"> HOME CLEANING SERVICE,Dog Walk,water tank cleaning ,HOME DUSTING ,Car Wash/ Car Dusting,Gardening </td>
                        </tr>
                        <tr>
                            <td> About  </td>
                            <td colspan="3"> DURGESH </td>
                        </tr>
                        <tr>
                            <td>  adhar  </td>
                            <td colspan="3">
                                <div>
                                    <img width={160} className='img-thumbnail' src='https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=' />
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td>  pen card </td>
                            <td colspan="3">
                                <div>
                                    <img width={160} className='img-thumbnail' src='https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=' />
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td>  PHOTO </td>
                            <td colspan="3">
                                <div>
                                    <img width={160} className='img-thumbnail' src='https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=' />
                                </div>
                            </td>

                        </tr>

                    </tbody></table>

            </div>
        </div>
    )
}
export default Profile