class DoctorApiService {
    logIn = async(userData) => {
        const response = await fetch(
            "https://ajax.test-danit.com/api/v2/cards/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );
        return response;
    };

    getCards = async() => {
        const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const cards = await response.json();
        return cards;
    };

    deleteCard = async(id) => {
        await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    };

    createCard = async(data) => {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
        const card = await response.json();
        return card;
    };

    amendCard = async(data, id) => {
        await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
    };
}

export default DoctorApiService;