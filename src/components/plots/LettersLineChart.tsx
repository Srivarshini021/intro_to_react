import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface LettersLineChartProps {
    stateCountyData: { [key: string]: { name: string; GISJOIN: string }[] };
}

export default function LettersLineChart({stateCountyData}: LettersLineChartProps) {
    const calculateLetterCount = (name: string) => {
        return name.replace(/\s/g, '').length;
    };

    const data = Object.entries(stateCountyData).map(([state, counties]) => {
        return counties.map((county) => ({
            county: county.name,
            letterCount: calculateLetterCount(county.name)
        }));
    }).flat();

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="county" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="letterCount" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}