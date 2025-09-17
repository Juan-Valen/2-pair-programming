import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const editJob = async () => {
    const job = {
      ...formData,
      company: {
        name: formData.companyName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      },
    };
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        navigate("/");
        console.log("Updated Goodly");
      } else {
        console.error("Failed to update!");
      }
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        const job = {
          title: data.title,
          type: data.type,
          description: data.description,
          location: data.location,
          salary: data.salary,
          companyName: data.company.name,
          contactEmail: data.company.contactEmail,
          contactPhone: data.company.contactPhone,
        };
        setFormData(job);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJob();
  }, [id]);

  const submitForm = (e) => {
    e.preventDefault();
    editJob();
    console.log("EditJobPage");
  };

  const cancelEdit = () => {
    console.log("cancelEdit");
    navigate(`/jobs/${id}`);
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input value={formData.title} id="title" onChange={handleChange} />
        <label>Job type:</label>
        <select value={formData.type} id="type" onChange={handleChange}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          value={formData.description}
          id="description"
          onChange={handleChange}
        ></textarea>
        <label>Company Name:</label>
        <input
          value={formData.companyName}
          id="companyName"
          onChange={handleChange}
        />
        <label>Contact Email:</label>
        <input
          value={formData.contactEmail}
          id="contactEmail"
          onChange={handleChange}
        />
        <label>Contact Phone:</label>
        <input
          value={formData.contactPhone}
          id="contactPhone"
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          value={formData.location}
          id="location"
          onChange={handleChange}
        />
        <label>Salary:</label>
        <input value={formData.salary} id="salary" onChange={handleChange} />
        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
