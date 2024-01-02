export const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL || ''
export const DATABASE_AUTH_TOKEN = process.env.NEXT_PUBLIC_DATABASE_AUTH_TOKEN || ''

export const listFilter: string[] = ["ALL", "Complete", "Incomplete"];
export const statusDropdown: string[] = ["Complete", "Incomplete"];

export function getFormattedDate(timestamp: number){
    const date = new Date(timestamp);
    console.log({DATE: date})

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    // Formatear la fecha
    const formattedDate = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}, ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    // Mostrar el resultado
    return formattedDate
}
