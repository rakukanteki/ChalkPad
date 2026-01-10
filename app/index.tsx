import { Redirect } from 'expo-router';

export default function Index() {
  // Direct redirect, no loading needed
  return <Redirect href="/user-selection" />;
}