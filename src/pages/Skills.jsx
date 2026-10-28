import React, { useState } from "react";
import SkillCard from "../components/SkillCard";

function Skills() {

  const [showForm, setShowForm] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [progress, setProgress] = useState(0);
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Learning");

  const [editId, setEditId] = useState(null);

  const [filter, setFilter] = useState("All");

  const [sortBy, setSortBy] = useState("Progress");

  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Python",
      category: "Programming",
      difficulty: "Beginner",
      progress: 80,
      targetDate: "2026-09-01",
      description: "Learning Python programming",
      status: "Learning"
    },
    {
      id: 2,
      name: "Machine Learning",
      category: "AI",
      difficulty: "Intermediate",
      progress: 65,
      targetDate: "2026-10-01",
      description: "Learning machine learning concepts",
      status: "Learning"
    },
    {
      id: 3,
      name: "SQL",
      category: "Database",
      difficulty: "Beginner",
      progress: 50,
      targetDate: "2026-09-15",
      description: "Learning SQL and databases",
      status: "Learning"
    },
    {
      id: 4,
      name: "React",
      category: "Web Development",
      difficulty: "Beginner",
      progress: 40,
      targetDate: "2026-10-15",
      description: "Learning React basics",
      status: "Paused"
    }
  ]);


  // Add or edit a skill

  function submit(event) {

    event.preventDefault();

    if (editId === null) {

      const newSkill = {
        id: skills.length + 1,
        name: skillName,
        category: category,
        difficulty: difficulty,
        progress: Number(progress),
        targetDate: targetDate,
        description: description,
        status: status
      };

      setSkills([
        ...skills,
        newSkill
      ]);

    } else {

      const newSkills = [];

      for (let i = 0; i < skills.length; i++) {

        if (skills[i].id === editId) {

          const updatedSkill = {
            id: editId,
            name: skillName,
            category: category,
            difficulty: difficulty,
            progress: Number(progress),
            targetDate: targetDate,
            description: description,
            status: status
          };

          newSkills.push(updatedSkill);

        } else {

          newSkills.push(skills[i]);

        }

      }

      setSkills(newSkills);
    }


    // Clear form

    setSkillName("");
    setCategory("");
    setDifficulty("Beginner");
    setProgress(0);
    setTargetDate("");
    setDescription("");
    setStatus("Learning");

    setEditId(null);
    setShowForm(false);

  }


  // Edit a skill

  function editSkill(skill) {

    setSkillName(skill.name);
    setCategory(skill.category);
    setDifficulty(skill.difficulty);
    setProgress(skill.progress);
    setTargetDate(skill.targetDate);
    setDescription(skill.description);
    setStatus(skill.status);

    setEditId(skill.id);

    setShowForm(true);

  }


  // Delete a skill

  function deleteSkill(id) {

    const newSkills = [];

    for (let i = 0; i < skills.length; i++) {

      if (skills[i].id !== id) {
        newSkills.push(skills[i]);
      }

    }

    setSkills(newSkills);

  }


  // Create list of skills to display

  let visibleSkills = [];

  for (let i = 0; i < skills.length; i++) {

    if (filter === "All") {

      visibleSkills.push(skills[i]);

    } else if (skills[i].status === filter) {

      visibleSkills.push(skills[i]);

    }

  }


  // Sort skills by progress

  if (sortBy === "Progress") {

    for (let i = 0; i < visibleSkills.length; i++) {

      for (let j = i + 1; j < visibleSkills.length; j++) {

        if (
          visibleSkills[j].progress >
          visibleSkills[i].progress
        ) {

          let temp = visibleSkills[i];

          visibleSkills[i] = visibleSkills[j];

          visibleSkills[j] = temp;

        }

      }

    }

  }


  // Sort skills by name

  if (sortBy === "Name") {

    for (let i = 0; i < visibleSkills.length; i++) {

      for (let j = i + 1; j < visibleSkills.length; j++) {

        if (
          visibleSkills[j].name <
          visibleSkills[i].name
        ) {

          let temp = visibleSkills[i];

          visibleSkills[i] = visibleSkills[j];

          visibleSkills[j] = temp;

        }

      }

    }

  }


  return (
    <div>

      {/* Page Heading */}

      <div className="page-head row-between">

        <div>

          <h1>My Skills</h1>

          <p className="muted">
            Everything you're learning, with live progress.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={() => {

            setSkillName("");
            setCategory("");
            setDifficulty("Beginner");
            setProgress(0);
            setTargetDate("");
            setDescription("");
            setStatus("Learning");

            setEditId(null);

            setShowForm(!showForm);

          }}
        >
          + Add Skill
        </button>

      </div>


      {/* Add / Edit Form */}

      {showForm && (

        <form
          className="card mt"
          onSubmit={submit}
        >

          <h2>
            {editId === null
              ? "Add a new skill"
              : "Edit skill"}
          </h2>


          <div className="form-grid mt">


            <label className="field">

              Skill name

              <input
                value={skillName}
                onChange={(event) =>
                  setSkillName(event.target.value)
                }
                required
              />

            </label>


            <label className="field">

              Category

              <input
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              />

            </label>


            <label className="field">

              Difficulty

              <select
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value)
                }
              >

                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>

              </select>

            </label>


            <label className="field">

              Status

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >

                <option>Learning</option>
                <option>Paused</option>
                <option>Completed</option>

              </select>

            </label>


            <label className="field">

              Progress (%)

              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(event) =>
                  setProgress(event.target.value)
                }
              />

            </label>


            <label className="field">

              Target date

              <input
                type="date"
                value={targetDate}
                onChange={(event) =>
                  setTargetDate(event.target.value)
                }
              />

            </label>


            <label className="field">

              Description

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows="2"
              />

            </label>

          </div>


          <div className="card-actions">

            <button
              className="btn btn-primary"
              type="submit"
            >
              {editId === null
                ? "Add Skill"
                : "Save Skill"}
            </button>


            <button
              className="btn btn-light"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </div>

        </form>

      )}


      {/* Filter Buttons */}

      <div className="toolbar mt">

        <button
          className={
            filter === "All"
              ? "btn btn-primary"
              : "btn btn-light"
          }
          onClick={() => setFilter("All")}
        >
          All
        </button>


        <button
          className={
            filter === "Learning"
              ? "btn btn-primary"
              : "btn btn-light"
          }
          onClick={() => setFilter("Learning")}
        >
          Learning
        </button>


        <button
          className={
            filter === "Paused"
              ? "btn btn-primary"
              : "btn btn-light"
          }
          onClick={() => setFilter("Paused")}
        >
          Paused
        </button>


        <button
          className={
            filter === "Completed"
              ? "btn btn-primary"
              : "btn btn-light"
          }
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>


        <span className="muted small">
          Sort by:
        </span>


        <select
          className="btn"
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value)
          }
        >

          <option>Progress</option>
          <option>Name</option>

        </select>

      </div>


      {/* Skill Cards */}

      <div className="grid grid-3">

        {visibleSkills.map(function (skill) {

          return (

            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={editSkill}
              onDelete={deleteSkill}
            />

          );

        })}

      </div>

    </div>
  );
}

export default Skills;