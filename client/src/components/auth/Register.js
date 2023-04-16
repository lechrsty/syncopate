import { useState } from "react"
import { EmployeeRegister } from "./EmployeeRegister"
import { MemberRegister } from "./MemberRegister"
import "./Register.css"

export const Register = () => {

    const [showEmployeeModal, setShowEmployeeModal] = useState(false)
    const [showMemberModal, setShowMemberModal] = useState(false)

    const handleEmployeeModal = () => {
        setShowEmployeeModal(!showEmployeeModal)
    };

    const handleMemberModal = () => {
        setShowMemberModal(!showMemberModal)
    };

    return (
        <div className="register-wrapper">
            <p className="album-title">Are you registering as</p>
            <div className="button-container">
                <div>
                    <button className="button" onClick={handleEmployeeModal}> Employee</button>
                    {showEmployeeModal && (
                        <div className={`register-modal ${showEmployeeModal ? 'active' : ''}`}>
                            <span className="close" onClick={handleEmployeeModal}>&times;</span>
                            <div className="modal-content">
                                <EmployeeRegister handleEmployeeModal={handleEmployeeModal} />
                            </div>
                        </div>
                    )}
                </div>
                <p className="or margin-top-auto">or</p>
                <div>
                    <button className="button" onClick={handleMemberModal}> Member</button>
                    {showMemberModal && (
                        <div className={`register-modal ${showMemberModal ? 'active' : ''}`}>
                            <span className="close" onClick={handleMemberModal}>&times;</span>
                            <div className="modal-content">
                                <MemberRegister handleMemberModal={handleMemberModal} />
                            </div>
                        </div>
                    )}
                </div>
                <p className="or margin-top-auto">?</p>

            </div>
        </div>
    )
}
