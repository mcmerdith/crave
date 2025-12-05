import React, { useCallback, useRef } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RestaurantSwipeData, transformPlacesApiData } from "@/lib/places";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { useLocationContext, useMatchContext } from "@/lib/context";

import { SwipeModeParams } from "@/lib/routeParams";

const ICON_SIZE = 24;

export default function Swipe() {
  const router = useRouter();

  const { mode } = useLocalSearchParams<SwipeModeParams>();

  const { location } = useLocationContext();

  const { data: locations } = useQuery(
    trpc.places.search.queryOptions({
      center: location.coordinate,
    }),
  );

  const { setMatch } = useMatchContext();

  const onSwipeComplete = (selected: RestaurantSwipeData[]) => {
    const selection = selected[Math.floor(Math.random() * selected.length)];
    setMatch(selection);
    if (mode === "group") {
      router.replace("/swipe/group/lobby?code=COBRCY&started=true");
    } else {
      router.replace("/swipe/solo/complete");
    }
    console.log(
      "done swiping",
      selected.map((s) => s.name),
    );
  };

  if (locations) {
    return (
      <SwipeFlow
        options={transformPlacesApiData(locations).slice(0, 8)}
        onSwipeComplete={onSwipeComplete}
      />
    );
  } else {
    return <></>;
  }
}

function SwipeFlow({
  options,
  onSwipeComplete,
}: {
  options: RestaurantSwipeData[];
  onSwipeComplete: (restaurants: RestaurantSwipeData[]) => void;
}) {
  const selected = useRef<RestaurantSwipeData[]>([]);
  const ref = useRef<SwiperCardRefType>(null);
  const renderCard = useCallback((item: RestaurantSwipeData) => {
    return (
      <View style={styles.renderCardContainer}>
        {/* Top Half Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item.image ??
                "https://placehold.co/600x600/?text=No+Image+Available",
            }}
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

  const OverlayLabel = (color: string) => (
    <View style={[styles.overlayLabelContainer, { backgroundColor: color }]} />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref={ref}
          data={options}
          cardStyle={styles.cardStyle}
          disableTopSwipe={true}
          swipeVelocityThreshold={300}
          disableBottomSwipe={true}
          overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
          renderCard={renderCard}
          //FlippedContent={renderFlippedCard}
          OverlayLabelRight={() => OverlayLabel("green")}
          OverlayLabelLeft={() => OverlayLabel("red")}
          onSwipeRight={(index) => selected.current.push(options[index])}
          onSwipedAll={() => onSwipeComplete(selected.current)}
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
