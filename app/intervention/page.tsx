import Header from "@/components/Header";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

const interventionPage = () => {
    return (
        <main className="w-full h-screen">
            <Header />
            <div className="flex items-center h-full justify-center">
            <Card>
                <CardHeader>
                    <h1 className="text-white text-xl">Interventions</h1>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            </div>
        </main>
    )
};

export default interventionPage;