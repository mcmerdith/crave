import Button from "@/components/button";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { router } from "expo-router";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      {error && <Text>{error}</Text>}
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button
        title="Sign In"
        onPress={() => {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              router.back();
            })
            .catch((e) => {
              setError(`${e.code}: ${e.message}`);
            });
        }}
      />
    </div>
  );
}
