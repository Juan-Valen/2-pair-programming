import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
    const [form, setForm] = useState({ title: "", type: "", description: "", companyName: "", contactPhone: "", contactEmail: "" })
    const navigate = useNavigate();
    async function addJob() {

        const postData = {
            ...form,
            company: {
                name: form.companyName,
                contactEmail: form.contactEmail,
                contactPhone: form.contactPhone
            }
        }

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData)
            });

            if (res.ok) {
                console.log("Job added successfully!");
                navigate("/")
            } else {
                console.error("POST FAILED!");

            }
        } catch (error) {
            console.error("catch error:", error);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        addJob();
        console.log("submitForm called");

    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="create">
            <h2>Add a New Job</h2>
            <form onSubmit={submitForm}>
                <label>Job title:</label>
                <input
                    id="title"
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange}
                />
                <label>Job type:</label>
                <select
                    id="type"
                    value={form.type}
                    onChange={handleChange}>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                </select>

                <label>Job Description:</label>
                <textarea
                    id="description"
                    required
                    value={form.description}
                    onChange={handleChange}></textarea>
                <label>Company Name:</label>
                <input
                    id="companyName"
                    type="text"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                />
                <label>Contact Email:</label>
                <input
                    id="contactEmail"
                    type="text"
                    required
                    value={form.contactEmail}
                    onChange={handleChange}
                />
                <label>Contact Phone:</label>
                <input
                    id="contactPhone"
                    type="text"
                    required
                    value={form.contactPhone}
                    onChange={handleChange}
                />
                <button>Add Job</button>
            </form>
        </div>
    );
};

export default AddJobPage;
