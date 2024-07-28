import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input } from 'reactstrap'
import Swal from 'sweetalert2'
import { GetAddHeadExp, GetAllHeadExp } from '../../../../Store/Actions/Dashboard/expenseActions'
import { API_URL } from '../../../../config'
import axios from 'axios'

const AddExpensesForm = ({toggleModal,data}) => {

    const [name, setExpName] = useState(data.name)
    const dispatch = useDispatch()



    const OnSubmit = () => {
        if (name === '') return Swal.fire({ text: 'please fill the Head Expense name first' })

        const formdata = {
            name: ''
        }
        formdata.name = name
     if(data.id){
        axios.patch(`${API_URL}/expense/updateheadexpense/${data.id}`, formdata)
			.then(response => {
				if (response.status === 200) {
					toggleModal();
					Swal.fire(
						'Successfully!',
						response.data.message,
						'success'
					)
					dispatch(GetAllHeadExp())
                    toggleModal()
					
				} else {
					Swal.fire({
						title: 'failed to add try again',
						icon: "error",
					})
				}
			
			})
			.catch(error => {
				console.error('Error:', error);
			});
     }else{
        dispatch(GetAddHeadExp(formdata)).then(() => {
            setExpName("")
            dispatch(GetAllHeadExp())
            toggleModal()
        })
     }
       
    }

    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
            }
        };

    return (
        <Fragment>
            <div >
                <h5>Name</h5>
                <Input placeholder='Name' className='w-100' value={name} onChange={(e) => { setExpName(e.target.value) }} onKeyPress={handleKeyPress} />
                <Button className='bg-primary mt-3 text-white w-100' onClick={OnSubmit} > {(data.name) ? 'Update': 'Submit' }  </Button>
            </div>

        </Fragment>
    )
}

export default AddExpensesForm