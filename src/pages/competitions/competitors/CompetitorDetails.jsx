import React from "react";

const CompetitorDetail = () => {
  const competitor = {
    id: "1",
    username: "TechGuru",
    email: "techguru@example.com",
    profileImage: "https://picsum.photos/id/1025/400/400",
    votes: 320,
    socialLinks: {
      facebook: "https://facebook.com/techguru",
      tiktok: "https://tiktok.com/@techguru",
      twitter: "https://twitter.com/techguru",
      instagram: "https://instagram.com/techguru",
      snapchat: "https://snapchat.com/add/techguru",
    },
    hobbies: ["coding", "gaming", "blogging"],
    reason: "To inspire and engage with tech enthusiasts worldwide.",
    role: "Developer",
  };

  return (
    <div className="container my-4">
      <div className="competitor-details-card">
        <div className="row g-3 align-items-center border-bottom pb-3 mb-3">
          <div className="col-md-5 text-center">
            <img
              src={competitor.profileImage}
              alt={competitor.username}
              className="rounded-2 img-fluid"
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          <div className="col-md-7">
            <h2>{competitor.username}</h2>
            <p>
              <strong>Email:</strong> {competitor.email}
            </p>
            <p>
              <strong>Role:</strong> {competitor.role}
            </p>
            <p>
              <strong>Votes:</strong> {competitor.votes}
            </p>
          </div>
        </div>

        <p className="mb-4">
          <strong>Reason for Joining:</strong> {competitor.reason}
        </p>

        <div className="d-flex gap-3 mb-4">
          <p>
            <strong>Hobbies:</strong> {competitor.hobbies.join(", ")}
          </p>
        </div>

        <h5>Social Links</h5>
        <div className="d-flex flex-wrap gap-3 mb-4">
          <a
            href={competitor.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary"
          >
            Facebook
          </a>
          <a
            href={competitor.socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-dark"
          >
            TikTok
          </a>
          <a
            href={competitor.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-info"
          >
            Twitter
          </a>
          <a
            href={competitor.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-danger"
          >
            Instagram
          </a>
          <a
            href={competitor.socialLinks.snapchat}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-warning"
          >
            Snapchat
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompetitorDetail;
