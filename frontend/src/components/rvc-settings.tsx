import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ttsManager } from "@/lib/ttsManager";
import { RVCProvider } from "@/lib/tts/rvcProvider";
import SettingDropdown from "./setting-dropdown";
import SettingSwitch from "./setting-switch";

export default function RvcSettings() {
    const [rvcModels, setRvcModels] = useState<string[]>([]);
    const [edgeModels, setEdgeModels] = useState<string[]>([]);
    const provider = ttsManager.getCurrentProviderInstance() as RVCProvider;

    useEffect(() => {
        // Initial state
        setRvcModels(provider.getVoices());
        setEdgeModels(provider.getEdgeVoices());

        // Subscribe to changes
        const unsubscribe = provider.subscribe(() => {
            setRvcModels(provider.getVoices());
            setEdgeModels(provider.getEdgeVoices());
        });

        return unsubscribe;
    }, [provider]);

    const handleRvcModelChange = async (modelName: string) => {
        if (modelName) {
            try {
                await provider.setVoice(modelName);
            } catch (error) {
                console.error('Failed to load RVC model:', error);
            }
        }
    }

    const handleEdgeModelChange = (modelName: string) => {
        if (modelName) {
            provider.setEdgeVoice(modelName);
        }
    }

    // Convert model arrays to options objects
    const rvcOptions = Object.fromEntries(rvcModels.map(model => [model, model]));
    const edgeOptions = Object.fromEntries(edgeModels.map(model => [model, model]));

    return (
        <div className="space-y-2">
            <Card>
                <CardContent className="space-y-6">
                    <div className="flex space-x-4">
                        <SettingDropdown
                            id="tts.rvc.edge-tts-model"
                            defaultValue={edgeModels[0]}
                            label="Edge TTS Model"
                            options={edgeOptions}
                            onValueChange={handleEdgeModelChange}
                        />

                        <SettingDropdown
                            id="tts.rvc.model"
                            defaultValue={rvcModels[0]}
                            label="RVC Model"
                            options={rvcOptions}
                            onValueChange={handleRvcModelChange}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <SettingSwitch id="rvc.use-rvc" label="Use RVC" description="Turn off to skip RVC processing" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}