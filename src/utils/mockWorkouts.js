const mockWorkouts = [
    {
    "id": "f543fa6eebf4871798dc3377",
    "createdAt": "2024-12-29T18:42:29.131Z",
    "sourceId": null,
    "updatedAt": null,
    "source": "database",
    "userId": "system",
    "isCompleted": false,
    "category": {
      "id": "12jkmb-ased21-alc21",
      "source": "user",
      "name": "Stretching",
      "color": "blue"
    },
    "targetGroup": [
      { "id": "54sd-64fff-gf32", "source": "system", "name": "Full Body" },
    ],
    "author": "Stefan",
    "name": "Morning Stretches Routine",
    "description": "A series of active stretches to warm up your body and improve flexibility and posture for the day ahead.",
    "tags": [
      { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Stretching", "color": "blue" },
      { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Flexibility", "color": "green" }
    ],
    "reference": "",
    "difficulty": "Beginner",
    "equipment": [],
    "duration": 15,
    "visibility": "private",
    "notes": "Perform each stretch slowly and focus on breathing deeply during each movement.",
    "imageUrl": "",
    "exercises": [ "116047e9dc79e523cb6db0db", "feecb0cbb5c4d1ef55efb51c", "8cf65af882fac3cd7823b0fa", "1bdb34e724c7f1c9ec92c1a9", "19fdbafd7f093d04065bdfae", ]
  },
  {
    "id": "e7f45dad5dc7ebfea8cecbfe",
    "createdAt": "2024-12-29T18:43:29.131Z",
    "sourceId": null,
    "updatedAt": null,
    "source": "database",
    "authorId": "system",
    "isCompleted": false,
    "category": {
      "id": "12jkmb-ased21-alc21",
      "source": "user",
      "name": "Cardio",
      "color": "red"
    },
    "targetGroup": [
      { "id": "54sd-64fff-gf32", "source": "system", "name": "Cardiovascular" },
      { "id": "547ujj-12kkk-251gh", "source": "user", "name": "Cardiovascular" }
    ],
    "author": "Stefan",
    "name": "Daily Cardio",
    "description": "A high-intensity cardio routine designed to boost cardiovascular endurance and burn fat.",
    "tags": [
      { "id": "as7j-ksdf6-01saik1", "source": "user", "name": "Cardio", "color": "red" },
      { "id": "as3vgb0-a8f-4md907", "source": "user", "name": "Endurance", "color": "purple" }
    ],
    "reference": "",
    "difficulty": "Intermediate",
    "equipment": [{id: "1lkjnd-wdsa32-asd2", name: "Jump Rope", color: 'white'}],
    "duration": 30,
    "visibility": "private",
    "notes": "Perform each exercise with high intensity and minimal rest in between to keep your heart rate elevated.",
    "imageUrl": "",
    "exercises": ["19fdbafd7f093d04065bdfae", "2ac32cc2a705667e5e189281", "8cf65af882fac3cd7823b0fa", ]
  }


]
module.exports = {workouts: mockWorkouts};