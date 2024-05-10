import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface VowelPieChartProps {
    stateCountyData: { [key: string]: { name: string; GISJOIN: string }[] };
}

export default function VowelPieChart({stateCountyData}: VowelPieChartProps) {
    const countiesByVowels = () => {
        let vowelCount = 0;
        let consonantCount = 0;

        for (const state in stateCountyData) {
            for (const county of stateCountyData[state]) {
                const firstLetter = county.name.charAt(0).toLowerCase();
                if (/[aeiou]/.test(firstLetter)) {
                    vowelCount++;
                } else {
                    consonantCount++;
                }
            }
        }

        return [{ name: 'Vowels', value: vowelCount }, { name: 'Consonants', value: consonantCount }];
    };

    const data = countiesByVowels();

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name }) => name}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#82ca9d', '#ffc658'][index % 2]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}