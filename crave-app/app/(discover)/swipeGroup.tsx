import React, { useCallback, useRef } from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // type ImageSourcePropType,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { useRouter } from "expo-router";
import type { WithSpringConfig } from "react-native-reanimated";
import ColorfulButton from "@/components/colorfulButton";

//const router = useRouter();

const ICON_SIZE = 24;
export const SWIPE_SPRING_CONFIG: WithSpringConfig = {
  damping: 200,
  stiffness: 250,
  mass: 15,
  overshootClamping: true,
};

type Restaurant = {
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
};

export default function SwipeGroup() {
  const router = useRouter();
  const ref = useRef<SwiperCardRefType>(null);
  const renderCard = useCallback((item: Restaurant) => {
    return (
      <View style={styles.renderCardContainer}>
        {/* Top Half Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>

        {/* Bottom Half Info */}
        <View style={styles.infoBlock}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
            {item.name}
          </Text>
          <Text style={{ color: "black", fontSize: 16 }}>
            {item.cuisine} • {item.price} • ⭐ {item.rating}
          </Text>
          <Text style={{ color: "black", fontSize: 14 }}>
            {item.distance} away
          </Text>
        </View>
      </View>
    );
  }, []);

  // const renderFlippedCard = useCallback(
  //   (_: ImageSourcePropType, index: number) => (
  //     <View style={styles.renderFlippedCardContainer}>
  //       <Text style={styles.text}>Flipped content 🚀 {index}</Text>
  //     </View>
  //   ),
  //   [],
  // );

  const doneSwiping = () => {
    router.navigate("/finishedLobby");
    console.log("done swiping");
  };

  const OverlayLabel = (color: string) => (
    <View style={[styles.overlayLabelContainer, { backgroundColor: color }]} />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref={ref}
          data={swipeData}
          cardStyle={styles.cardStyle}
          disableTopSwipe={true}
          swipeVelocityThreshold={300}
          disableBottomSwipe={true}
          overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
          renderCard={renderCard}
          //FlippedContent={renderFlippedCard}
          OverlayLabelRight={() => OverlayLabel("green")}
          OverlayLabelLeft={() => OverlayLabel("red")}
          //OverlayLabelTop={() => OverlayLabel("blue")}
          //OverlayLabelBottom={() => OverlayLabel("orange")}
          onSwipedAll={() => doneSwiping()}
        />
      </View>

      <View style={styles.buttonsContainer}>
        {[
          //{ icon: "sync", action: () => ref.current?.flipCard() },
          {
            icon: "close",
            action: () => ref.current?.swipeLeft(),
          }, //dislike
          { icon: "reload", action: () => ref.current?.swipeBack() }, //undo
          { icon: "heart", action: () => ref.current?.swipeRight() }, //like
        ].map(({ icon, action }, i) => {
          let bgColor = "white";
          let iconColor = "white";

          if (icon === "close") bgColor = "red";
          if (icon === "heart") bgColor = "green";
          if (icon === "reload") {
            bgColor = "white";
            iconColor = "black";
          }
          return (
            <TouchableOpacity
              key={i}
              style={[styles.button, { backgroundColor: bgColor }]}
              onPress={action}
            >
              <AntDesign
                name={icon as any}
                size={ICON_SIZE}
                color={iconColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ColorfulButton
          variant="other"
          canStart={true}
          text="Go to Discover"
          onPress={() => doneSwiping()}
        />
      </View> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  imageContainer: {
    flex: 2,
    width: "100%",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },
  infoBlock: {
    flex: 1,
    width: "100%",
    padding: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  button: {
    height: 50,
    borderRadius: 40,
    aspectRatio: 1,
    backgroundColor: "#3A3D45",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  renderCardContainer: {
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "white",
  },

  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: "#baeee5",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  overlayLabelContainer: {
    borderRadius: 15,
    height: "90%",
    width: "90%",
  },
  overlayLabelContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#001a72",
  },
});

const swipeData = [
  {
    name: "Taverna",
    cuisine: "Italian",
    rating: 4.8,
    distance: "0.5 mi",
    price: "$$",
    image:
      "https://vrconcierge.com/wp-content/uploads/2021/02/taverna-rustic-italian-newark-de-exterior-1-768x512.jpg",
  },
  {
    name: "El Diablo",
    cuisine: "Mexican",
    rating: 4.4,
    distance: "0.5 mi",
    price: "$",
    image:
      "https://images.squarespace-cdn.com/content/v1/58b57e8b2e69cffff969c6cd/1488299173082-81E2GCSB63YW66RKF8HO/Burrito_wood_retouched.jpg?format=1500w",
  },
  {
    name: "m2o Burger",
    cuisine: "American",
    rating: 4.9,
    distance: "0.4 mi",
    price: "$",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,q_auto,fl_lossy,dpr_auto,c_fill,f_auto,h_800,g_auto/wtisrayz07qylnbwba6e",
  },
];
