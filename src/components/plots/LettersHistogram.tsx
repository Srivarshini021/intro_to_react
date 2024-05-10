import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface LettersHistogramProps {
    stateCountyData: { [key: string]: { name: string; GISJOIN: string }[] };
}

export default function LettersHistogram({ stateCountyData }: LettersHistogramProps) {
    const calculateLetterCount = (name: string) => {
        return name.replace(/\s/g, '').length;
    };

    const countCountiesByLetterCount = () => {
        const letterCounts: { [key: number]: number } = {};

        for (const state in stateCountyData) {
            for (const county of stateCountyData[state]) {
                const letterCount = calculateLetterCount(county.name);
                if (letterCounts[letterCount]) {
                    letterCounts[letterCount]++;
                } else {
                    letterCounts[letterCount] = 1;
                }
            }
        }

        return letterCounts;
    };

    const data = Object.entries(countCountiesByLetterCount()).map(([letterCount, count]) => ({
        letterCount: parseInt(letterCount),
        count: count
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="letterCount" type="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
