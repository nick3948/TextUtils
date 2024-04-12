import React from 'react'

export default function Footer() {
    return (
        <div style={{ textAlign: "center", bottom: "0", width: "100%" }}>
            <hr style={{ borderColor: "#ccc", borderWidth: "0.3px" }} />
            <p style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>© Copyright TextUtils 2024. All Rights Reserved</p>
            <p style={{ fontSize: "14px", color: "#555" }}>Designed by <a target="_blank" rel='noreferrer' href="https://www.linkedin.com/in/nikhil-kumar-gattu-a315a1184/" style={{ color: "#007bff", textDecoration: "none" }}>Nikhil</a></p>
        </div>
    )
}
