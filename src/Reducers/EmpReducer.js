const initialData = {
    list: [
        {
            id: 1,
            firstName: "Ronak",
            lastName: "Patel",
            email: "ronakhunt@gmail.com",
            profile: "http://media.idownloadblog.com/wp-content/uploads/2012/04/Phil-Schiller-headshot-e1362692403868.jpg",
            description: "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna ip sum dolore",
            hobby: "reading, playing",
        },
        {
            id: 2,
            firstName: "Arpit",
            lastName: "Khunt",
            email: "arpitkhunt200@gmail.com",
            profile: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
            description: "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna ip sum dolore",
            hobby: "tour",
        },
        {
            id: 3,
            firstName: "Viren",
            lastName: "Khunt",
            email: "virentkhunt000@gmail.com",
            profile: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
            description: "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna ip sum dolore",
            hobby: "watch movie",
        },
    ]
}

const EmpReducer =  (state = initialData, action) => {
    switch (action.type) {
        case "ADD_EMP":
            return {
                list: [
                    ...state.list,
                    action.payload.data
                ]
            }

        case "DELETE_EMP":
            return {
                list: [
                    ...state.list.filter(e => e.id !== action.payload.data)
                ]
            }

        case "UPDATE_EMP":
            const getSelectedUser = state.list.findIndex(user => user.id === action.payload.id);
            state.list[getSelectedUser] = action.payload.data
            return {
                ...state.list,
                list: state.list
            }
        default: return state;
    }
}

export default EmpReducer;