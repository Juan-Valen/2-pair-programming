import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        type: "Full-Time",
        location: "",
        description: "",
        salary: 4500,
        companyName: "",
        contactEmail: "",
        contactPhone: "",
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const navigate = useNavigate();

    const addJob = async (job) => {
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(job),
            });
            if (res.ok) {
                navigate('/');
                console.log("Successful");
            } else {
                console.error("Failed to post jobs.");
            }
        } catch (err) {
            console.error("Failed to post jobs: ", err);
        };
    }

    const submitForm = (e) => {
        e.preventDefault();
        const job = {
            ...formData,
            company: {
                name: formData.companyName,
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone,
            }
        }
        addJob(job);
        console.log("AddJobPage");
    };

    return (
        <div className="create">
            <h2>Add a New Job</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Job title:</label>
                <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor="type">Job type:</label>
                <select
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Select job type
                    </option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                </select>
                <label htmlFor="description">Job Description:</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="companyName">Company Name:</label>
                <input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                />
                <label htmlFor="contactEmail">Contact Email:</label>
                <input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                />
                <label htmlFor="contactPhone">Contact Phone:</label>
                <input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                />
                <label htmlFor="location">Location:</label>
                <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                />
                <label htmlFor="salary">Salary:</label>
                <input
                    id="salary"
                    type="text"
                    value={formData.salary}
                    onChange={handleChange}
                />
                <button type="submit">Add Job</button>
            </form>
        </div>
    );
};

export default AddJobPage;
