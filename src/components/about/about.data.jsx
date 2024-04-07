import { FaCertificate, FaLightbulb, FaRecycle, FaUsers } from 'react-icons/fa';
import { FaHeart, FaRunning, FaUserAlt, FaShieldAlt } from 'react-icons/fa';

export const our_value = {
    "sections": [{
            "title": "Innovation",
            "content": {
                "text": "We're constantly pushing the boundaries of what's possible, leveraging the latest technologies and materials to create technical clothing that's ahead of the curve.",
                "icon": <FaLightbulb className="icon" />
            }
        },
        {
            "title": "Quality",
            "content": {
                "text": "We believe in craftsmanship that stands the test of time. From the stitching to the fabric, every detail is meticulously crafted to ensure durability and performance.",
                "icon": <FaCertificate className="icon" />
            }
        },
        {
            "title": "Sustainability",
            "content": {
                "text": "We're committed to reducing our environmental footprint and promoting responsible manufacturing practices. That's why we prioritize eco-friendly materials and ethical production methods.",
                "icon": <FaRecycle className="icon" />
            }
        },
        {
            "title": "Community",
            "content": {
                "text": "We're more than just a brand – we're a community of like-minded adventurers and explorers. We're here to support and inspire each other on our journeys, sharing stories, tips, and gear recommendations along the way.",
                "icon": <FaUsers className="icon" />
            }
        }
    ]
}

export const mission_statement = {
    "heading": "Mission Statement and Core Values",
    "subheadings": [
      {
        "title": "Inspiring Confidence",
        "content": "At GearSmith, our mission is to inspire individuals to pursue their adventures with confidence.",
        "icon": <FaHeart className='icon' />
      },
      {
        "title": "Performance-driven Gear",
        "content": "We believe in the power of high-performance gear to enhance every journey, whether it's on the trails or in the urban jungle.",
        "icon": <FaRunning className='icon' />
      },
      {
        "title": "Personalized Style",
        "content": "Our curated selection of technical clothing is designed not only for exceptional performance but also to reflect your personal style and ethos.",
        "icon": <FaUserAlt className='icon' />
      },
      {
        "title": "Commitment to Quality",
        "content": "At GearSmith, quality is paramount. We are dedicated to providing gear that exceeds expectations in durability, functionality, and comfort.",
        "icon": <FaShieldAlt className='icon' />
      }
    ]
  }