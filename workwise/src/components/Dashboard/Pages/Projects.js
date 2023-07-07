import React from 'react'
import Project from './Project'
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { UserContext } from "../../../utils/contexts/User";


export default function Projects() {

	const [projects, setProjects] = useState([]);
	const { baseUrl } = useContext(UserContext);

	const getProjects = async () => {
		const res = await axios
		  .get(`${baseUrl}/projects/cards`, {
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
			},
		  });
		console.log(res.data.projects);
		setProjects(res.data.projects);
	};

	useEffect(() => {
		getProjects();
	}, []);
	
  return (
	<>
		{projects?.map((project) => (
			<Project key={project.id} project={project} />
		))}
	</>
  )
}
