"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Cloud Infrastructure</li>
        <li>CI/CD Pipelines</li>
        <li>Kubernetes</li>
        <li>Terraform</li>
        <li>Prometheus and Grafana</li>
        <li>Ansible</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Master of Electrical Engineering and IT</li>
        <li>Technische Hochschule Deggendorf</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Certified Solutions Architect - Associate</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            Hi, I&apos;m a passionate IT enthusiast with a strong foundation and a growing specialization in cloud infrastructure, DevOps, and IT automation.<br /><br />

After completing my Master&apos;s in Electrical Engineering and IT with a focus on automation, I started my professional journey as a software engineer at congatec GmbH. There, I developed and tested low-level firmware solutions and diagnostic tools, gaining valuable experience with Python, Linux, and systems programming.<br /><br />

Over time, I discovered a deeper interest in scalable and resilient IT infrastructures. To pursue this direction, I independently upskilled in AWS, Terraform, Kubernetes, and CI/CD practices. I earned the AWS Certified Solutions Architect – Associate certification and began applying these skills to personal projects and automated workflows.<br /><br />

I thrive in environments where automation, observability, and collaboration come together to create efficient and reliable systems. I enjoy solving complex problems, learning new technologies, and being part of communities that value openness and growth.<br /><br />

Currently, I&apos;m looking to deepen my expertise in DevOps engineering, with a special interest in cloud-native tools, infrastructure as code, and modern data center solutions.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
