const API_URL = "https://localhost:8787/";

export async function apiPostRequest(endpoint: string, body: any) {
    const res = await fetch(API_URL + endpoint, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            ...body,
            token: (localStorage.getItem("token") ?? "")
        })
    });

    const json = await res.json();
    const data = json.data;

    return data;
}