import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";

import apiRequest from "../services/api";

import "../styles/studentFormModal.css";

function StudentFormModal({
    show,
    editingStudent,
    onClose,
    onSuccess,
    onAuthError
}) {

    const initialFormData = {
        registrationNo: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");

    // Reset form when editingStudent changes or modal opens
    useEffect(() => {
        if (!show) return;

        if (editingStudent) {
            setFormData({
                registrationNo: editingStudent.registration_no || "",
                firstName: editingStudent.first_name || "",
                lastName: editingStudent.last_name || "",
                email: editingStudent.email || "",
                phoneNumber: editingStudent.phone_number || "",
                password: ""
            });
        } else {

            setFormData(initialFormData);
        }

        setFormError("");
    }, [editingStudent, show]);

    // Handle Input Changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };


    // Handle Close
    const handleClose = () => {
        if (formLoading) return;
        setFormError("");
        onClose();
    };


    // Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormError("");

        try {
            setFormLoading(true);

            if (editingStudent) {
                await apiRequest(
                    `/api/students/${editingStudent.student_id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            registrationNo: formData.registrationNo.trim(),
                            firstName: formData.firstName.trim(),
                            lastName: formData.lastName.trim(),
                            email: formData.email.trim(),
                            phoneNumber: formData.phoneNumber.trim()
                        })
                    }
                );
            } else {
                await apiRequest(
                    "/api/students/",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            registrationNo: formData.registrationNo.trim(),
                            firstName: formData.firstName.trim(),
                            lastName: formData.lastName.trim(),
                            email: formData.email.trim(),
                            phoneNumber: formData.phoneNumber.trim(),
                            password: formData.password
                        })
                    }
                );
            }

            onSuccess();
            handleClose();

        } catch (error) {
            console.error("Student save error:", error);

            if (error.status === 401) {
                onAuthError();
                return;
            }

            if (error.status === 403) {
                setFormError(
                    "You do not have permission to modify students."
                );
                return;
            }

            setFormError(
                error.message || "Failed to save student."
            );

        } finally {
            setFormLoading(false);
        }
    };


    if (!show) return null;


    // Reusable Input Field
    const renderInput = (name, label, type = "text") => (

        <div className="form-group">

            <label htmlFor={name}>
                {label}
            </label>

            <input
                id={name}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                disabled={formLoading}
                required
            />

        </div>
    );


    // Component UI
    return (

        <div
            className="modal-overlay"
            onClick={handleClose}
        >

            <div
                className="modal-content student-form-card"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="form-card-header">

                    <div>
                        <h3>
                            {editingStudent
                                ? "Edit Student"
                                : "Add New Student"
                            }
                        </h3>

                        <p>
                            {editingStudent
                                ? "Update student information."
                                : "Create a new student account."
                            }
                        </p>
                    </div>

                    <button
                        type="button"
                        className="close-form-button"
                        onClick={handleClose}
                        disabled={formLoading}
                        aria-label="Close"
                    >
                        <LuX size={20} />
                    </button>

                </div>


                {formError && (
                    <div className="dashboard-error">
                        {formError}
                    </div>
                )}


                <form
                    className="student-form"
                    onSubmit={handleSubmit}
                >

                    {renderInput(
                        "registrationNo",
                        "Registration Number"
                    )}

                    {renderInput(
                        "firstName",
                        "First Name"
                    )}

                    {renderInput(
                        "lastName",
                        "Last Name"
                    )}

                    {renderInput(
                        "email",
                        "Email",
                        "email"
                    )}

                    {renderInput(
                        "phoneNumber",
                        "Phone Number"
                    )}


                    {!editingStudent && (
                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={formLoading}
                                required
                            />
                        </div>
                    )}


                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleClose}
                            disabled={formLoading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={formLoading}
                        >
                            {formLoading
                                ? "Saving..."
                                : editingStudent
                                    ? "Update Student"
                                    : "Create Student"
                            }
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default StudentFormModal;