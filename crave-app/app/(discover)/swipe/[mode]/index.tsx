import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import CloseButton from "@/components/closeButton";
import FullPageMessage from "@/components/FullPageMessage";
import LoadingScreen from "@/components/LoadingScreen";
import RestaurantCard from "@/components/restaurantCard";
import {
  useLobbyContext,
  useLocationContext,
  useSwipeContext,
} from "@/lib/context";
import { useGroupLobby } from "@/lib/hooks/group-lobby";
import { RestaurantSwipeData, transformPlacesApiData } from "@/lib/places";
import { SwipeModeParams } from "@/lib/routeParams";
import { trpc } from "@/lib/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

const ICON_SIZE = 24;

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Swipe() {
  const router = useRouter();

  const { mode } = useLocalSearchParams<SwipeModeParams>();
  const { lobbyId } = useLobbyContext();

  const { location } = useLocationContext();

  const groupLobby = useGroupLobby(mode === "group" ? lobbyId : null);
  const userFinished = useMutation(
    trpc.groupLobby.userComplete.mutationOptions(),
  );

  useEffect(() => {
    if (mode === "group" && groupLobby?.self.data?.complete) {
      router.replace({
        pathname: "/swipe/group/lobby",
      });
    }
  }, [mode, groupLobby, router]);

  const { data: locations } = useQuery(
    trpc.places.search.queryOptions({
      center: location.coordinate,
    }),
  );

  const { setMatch, setAllMatches, setAllOptions } = useSwipeContext();

  const onSwipeComplete = async (
    liked: RestaurantSwipeData[],
    disliked: RestaurantSwipeData[],
  ) => {
    setAllOptions([...liked, ...disliked]);
    setAllMatches(liked);

    if (mode === "group") {
      if (groupLobby) {
        await groupLobby.self.update({
          complete: true,
          likeIds: liked.map((like) => like.id),
          dislikeIds: disliked.map((dislike) => dislike.id),
        });
        await userFinished.mutateAsync({ lobbyId: groupLobby.id });
      } else {
        console.error("Failed to update group lobby (does not exist?)");
      }

      router.replace({
        pathname: "/swipe/group/lobby",
      });
    } else {
      const selection = liked[Math.floor(Math.random() * liked.length)];
      setMatch(selection);

      router.replace("/swipe/solo/complete");
    }
  };

  if (locations) {
    return (
      <SwipeFlow
        options={transformPlacesApiData(locations).slice(0, 8)}
        onSwipeComplete={onSwipeComplete}
      />
    );
  } else if (locations === null) {
    return (
      <FullPageMessage
        title="Something went wrong"
        message="We couldn't find anything near you"
      />
    );
  } else {
    return <LoadingScreen />;
  }
}

function SwipeFlow({
  options,
  onSwipeComplete,
}: {
  options: RestaurantSwipeData[];
  onSwipeComplete: (
    liked: RestaurantSwipeData[],
    disliked: RestaurantSwipeData[],
  ) => void;
}) {
  const likedRestaurants = useRef<RestaurantSwipeData[]>([]);
  const dislikedRestaurants = useRef<RestaurantSwipeData[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const advance = (liked: boolean) => {
    if (liked) likedRestaurants.current.push(options[currentIndex]);
    else dislikedRestaurants.current.push(options[currentIndex]);

    const next = currentIndex + 1;
    if (next >= options.length) {
      onSwipeComplete(likedRestaurants.current, dislikedRestaurants.current);
    } else {
      pan.setValue({ x: 0, y: 0 }); // reset position
      setCurrentIndex(next);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 80) {
        Animated.timing(pan, {
          toValue: { x: 500, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => advance(true));
      } else if (gesture.dx < -80) {
        Animated.timing(pan, {
          toValue: { x: -500, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => advance(false));
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  const buttons = [
    { icon: "close", action: () => advance(false) },
    {
      icon: "reload",
      action: () => {
        pan.setValue({ x: 0, y: 0 });
        setCurrentIndex(Math.max(0, currentIndex - 1));
      },
    },
    { icon: "heart", action: () => advance(true) },
  ];

  const currentRestaurant = options[currentIndex];

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          padding: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <CloseButton />
      </View>

      <View style={styles.subContainer}>
        {currentRestaurant ? (
          <Animated.View
            style={[
              styles.cardStyle,
              { transform: [{ translateX: pan.x }, { rotate }] },
            ]}
            {...panResponder.panHandlers}
          >
            <RestaurantCard restaurant={currentRestaurant} />
          </Animated.View>
        ) : null}
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map(({ icon, action }, i) => {
          let bgColor =
            icon === "close" ? "red" : icon === "heart" ? "green" : "white";
          let iconColor = icon === "reload" ? "black" : "white";
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
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  imageContainer: {
    flex: 2,
    width: "100%",
  },
  subContainer: {
    height: SCREEN_HEIGHT * 0.65, // explicit height instead of flex: 1
    width: "100%",
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

  renderFlippedCard: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: "#fffff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    width: "90%",
    height: 400,
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
  webCardWrapper: {
    width: "90%",
    maxWidth: 420,
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    display: "flex",
    flexShrink: 0,
  },
});
