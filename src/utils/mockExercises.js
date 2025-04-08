const mockExercises = [
    {
      "id": "116047e9dc79e523cb6db0db",
      "createdAt": "2024-12-29T18:33:29.131Z",
      "sourceId": null,
      "authorId": "system",
      "updatedAt": null,
      "source": "database",
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "author": "system",
        "name": "Stretching",
        "color": "orange"
      },
      "targetGroup": [{"id": "askjb2a-asdas8-2asc", "name": "Arms", "author": "system"}],
      "author": "system",
      "name": "Arm Circles",
      "description": "A dynamic stretch to warm up the shoulders and arms, improving flexibility and blood flow.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "author": "system", "name": "Arms", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "author": "system", "name": "Stretch", "color": "green" }
      ],
      "reference": '',
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 3,
      "visibility": "private",
      "notes": "Start with small circles and gradually increase the size.",
      "imageUrl": "",
      "sets" : 1,
      "rest": 45,
      "restUnit": "sec",
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of arm circles in seconds",
          "unit": "rotations",
          "target": "10",
          "type": "number",
          "source": "system",
          "value": 0,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "feecb0cbb5c4d1ef55efb51c",
      "createdAt": "2024-12-29T18:34:29.131Z",
      "sourceId": null,
      "authorId": "system",
      "updatedAt": null,
      "source": "database",
      "isCompleted": false,
      "targetGroup": [{"id": "askjb2a-s91kj12-2asc", "name": "Legs", "author": "system"}],
      "category": {
        "id": "12jkmb-ased21-alc21",
        "author": "system",
        "name": "Stretching",
        "color": "purple"
      },
      "author": "system",
      "name": "Leg Swings",
      "description": "A dynamic stretch for the legs to improve hip flexibility and range of motion.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "author": "system", "name": "Legs", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "author": "system", "name": "Stretch", "color": "green" }
      ],
      "reference": '',
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 5,
      "visibility": "private",
      "notes": "Swing the leg forward and backward while keeping your core engaged.",
      "imageUrl": "",
      "sets" : 1,
      "rest": 45,
      "restUnit": "sec",
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of leg swings in seconds",
          "unit": "seconds",
          "target": "5",
          "type": "number",
          "source": "system",
          "value": 0,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "8cf65af882fac3cd7823b0fa",
      "createdAt": "2024-12-29T18:35:29.131Z",
      "sourceId": null,
      "authorId": "system",
      "updatedAt": null,
      "source": "database",
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "author": "system",
        "name": "Stretching",
        "color": "green"
      },
      "author": "system",
      "name": "Torso Twists",
      "targetGroup": [{"id": "s901khgb7-asdas8-2asc", "name": "Core", "author": "system"}],
      "description": "A dynamic stretch to loosen the spine and engage the core muscles.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "author": "system", "name": "Core", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "author": "system", "name": "Stretch", "color": "green" }
      ],
      "reference": '',
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 4,
      "visibility": "private",
      "notes": "Keep your hips facing forward and rotate only your torso.",
      "imageUrl": "",
      "sets" : 1,
      "rest": 45,
      "restUnit": "sec",
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of torso twists in seconds",
          "unit": "seconds",
          "target": "4",
          "type": "number",
          "source": "system",
          "value": 0,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "1bdb34e724c7f1c9ec92c1a9",
      "createdAt": "2024-12-29T18:36:29.131Z",
      "sourceId": null,
      "authorId": "system",
      "updatedAt": null,
      "source": "database",
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "author": "system",
        "name": "Stretching",
        "color": "pink"
      },
      "author": "system",
      "name": "Standing Side Reach",
      "targetGroup": [],
      "description": "A stretch that targets the obliques and helps improve posture.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "author": "system", "name": "Core", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "author": "system", "name": "Stretch", "color": "green" }
      ],
      "reference": '',
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 4,
      "visibility": "private",
      "notes": "Make sure to reach over your head and not just to the side.",
      "imageUrl": "",
      "sets" : 1,
      "rest": 45,
      "restUnit": "sec",
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of standing side reach in seconds",
          "unit": "seconds",
          "target": "4",
          "type": "number",
          "source": "system",
          "value": 0,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "19fdbafd7f093d04065bdfae",
      "createdAt": "2024-12-29T18:37:29.131Z",
      "sourceId": null,
      "authorId": "system",

      "updatedAt": null,
      "source": "database",
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "author": "system",
        "name": "Cardio",
        "color": "red"
      },
      "author": "system",
      "name": "Rope Jumping",
      "targetGroup": [{"id": "askj2b2a-asd3as8-2asc", "name": "Lower Body", "author": "system"}],
      "description": "A classic cardio exercise that improves cardiovascular endurance, coordination, and agility.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "author": "system", "name": "Cardio", "color": "red" },
        { "id": "as3vgb0-a8f-4md907", "author": "system", "name": "Jumping", "color": "blue" }
      ],
      "reference": '',
      "difficulty": "Intermediate",
      "equipment": [{ "id": "as7j2-ksxxdf6-01sa2aik1", "author": "system", "name": "Jump Rope", "atributes": [] }],
      "duration": 10,
      "visibility": "private",
      "notes": "Focus on your rhythm and breathing.",
      "imageUrl": "",
      "sets" : 1,
      "rest": 45,
      "restUnit": "sec",
      "fields": [
        {
          "id": "field4",
          "name": "Duration",
          "description": "Duration of rope jumping in seconds",
          "unit": "seconds",
          "target": "10",
          "type": "number",
          "source": "system",
          "value": 0,
          "isCompleted": false,
          "validation": { "min": 0, "max": 9999 },
          "order": 1
        }
      ]
    },
    {
      "id": "2ac32cc2a705667e5e189281",
      "createdAt": "2024-12-29T18:32:29.131Z",
      "sourceId": null,
      "authorId": "system",

      "updatedAt": null,
      "source": "database",
      "isCompleted": false,
      "category": {
        "id": "12jkmb-ased21-alc21",
        "author": "system",
        "name": "Stretching",
        "color": "yellow"
      },
      "targetGroup": [
        { "id": "54sd-64fff-gf32", "source": "system", "name": "Hip Flexors" },
        { "id": "547ujj-12kkk-251gh", "author": "system", "name": "Hip Flexors" }
      ],
      "author": "system",
      "name": "Dynamic Hip Flexor Stretch",
      "targetGroup": ['Hip Flexor'],
      "description": "A dynamic stretch focusing on opening the hips and improving flexibility in the hip flexors.",
      "tags": [
        { "id": "as7j-ksdf6-01saik1", "author": "system", "name": "Hip Flexors", "color": "blue" },
        { "id": "as3vgb0-a8f-4md907", "author": "system", "name": "Stretch", "color": "green" }
      ],
      "reference": '',
      "difficulty": "Beginner",
      "equipment": [],
      "duration": 5,
      "visibility": "private",
      "notes": "Keep your posture straight and avoid arching your back.",
      "imageUrl": "",
      "sets": 3,
      "rest": 45,
      "restUnit": "sec",
    }
    
  ]

  module.exports = {exercises: mockExercises};